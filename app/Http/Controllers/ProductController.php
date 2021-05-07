<?php

namespace App\Http\Controllers;

use App\Models\product_img;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Intervention\Image\Facades\Image;

class ProductController extends Controller
{
    public function data_config()
    {
        // table_name
        $table_name = 'product';
        // PrimaryKey
        $primaryKey = 'id';
        // filed
        $field = [
            'product' => config_field('text'),
            'desc' => config_field('tiny_mce'),
            'category_id' => config_field('select'),
            'url' => config_field('text'),
            'size' => config_field('integer'),
            'cost' => config_field('decimal'),
            'price' => config_field('decimal'),
            'price_default' => config_field('decimal'),
            'is_order' => config_field('boolean'),
            'active' => config_field('boolean'),
            'image' => config_field('multiple_image'),
        ];
        // hidden column
        $hidden_column = [
            'url',
            'desc',
        ];
        // default value
        $default_value = [
            'active' => true,
        ];
        // label
        $label = [
            'url' => 'product_url',
            'price' => 'promotional_price',
        ];
        // form
        $form = [
            0 => ['type' => 'div',
                'class' => 'col-md-12 col-lg-12 mt-2',
                'items' => [
                    0 => [
                        'type' => 'div',
                        'class' => 'col-md-12 col-lg-5',
                        'items' => [
                            0 => [
                                'type' => 'field',
                                'items' => [
                                    'product',
                                    'category_id',
                                    'url',
                                    'size',
                                    'cost',
                                    'price',
                                    'price_default',
                                    'is_order',
                                    'active',
                                ],
                            ]
                        ],
                    ],
                    1 => [
                        'type' => 'div',
                        'class' => 'col-md-12 col-lg-7',
                        'items' => [
                            0 => [
                                'type' => 'field',
                                'items' => [
                                    'desc',
                                    'image',
                                ]
                            ],
                        ]
                    ],
                ],
            ],
        ];
        // select field
        $select = [
            'category_id' => DB::table('category')->pluck('category', 'id'),
        ];
        // required
        $required = [
            'product',
            'url',
            'price_default',
        ];
        $category = $this->category();
        // reference
        $reference = [];
        // primarySearch
        $primarySearch = [];
        // search_popup
        $search_popup = $this->search_popup();
        // table join
        $table_join = $this->table_join();
        // index filter
        $index_filter = $this->index_filter();
        // field_join
        $field_join = $this->field_join();
        return [
            'table_name' => $table_name,
            'primaryKey' => $primaryKey,
            'field' => $field,
            'hidden_column' => $hidden_column,
            'default_value' => $default_value,
            'label' => $label,
            'form' => $form,
            'select' => $select,
            'required' => $required,
            'reference' => $reference,
            'search_popup' => $search_popup,
            'primarySearch' => $primarySearch,
            'table_join' => $table_join,
            'redirect' => true, // true: redirect to index, false: show message
            'index_filter' => $index_filter,
            'import' => false,
            'export' => false,
            'field_join' => $field_join,
            'other_config' => [
                'category' => $category,
            ],
        ];
    }

    public function index_filter()
    {
        return config_search_popup('product_id');
    }

    public function search_popup()
    {
        return [];
    }

    public function table_join()
    {
        return [
            [
                'label_tab' => 'Kiểu sản phẩm',
                'table' => 'product_model',
                'primaryKey' => 'id',
                'join_field' => 'product_id',
                'export' => false,
                'field_type' => [],
                'default_value' => [
                    'active' => true,
                ],
                'hide_field' => [
                    'url',
                    'created_at',
                    'updated_at',
                ],
                'required' => [
                    'note',
                ],
                'join' => [
                ],
                'search_popup' => [],
            ],
        ];
    }

    public function field_join()
    {
        return [];
    }

    public function index()
    {
        return reports_form_index($this->data_config());
    }

    public function show($id)
    {
        return reports_form_show($id, $this->data_config());
    }

    public function create()
    {
        $obj = reports_form_create_data($this->data_config());
        return View::make('report/data_form')->with('obj', $obj);
    }

    public function store(Request $request)
    {
        $requestData = $request->all();
        $message = $this->validate_product('', $request);
        if ($message) {
            return [
                'status' => 'error',
                'message' => $message,
            ];
        }
        $return = reports_form_store($this->data_config(), $requestData);
        $this->product_images($requestData, $return);
        return $return;
    }

    public function edit($id)
    {
        $data = $this->data_config();
        $record = DB::table('product')->select('product')->find($id);
        if ($record) {
            $data['title'] = $record->product;
        }
        // image
        $images = DB::table('product_img')->select('id', 'url')->where('product_id', $id)->where('active', 1)->pluck('url', 'id');
        $data['dataMultiImageDB']['image'] = $images;
        // category selected
        $category_selected = [];
        $category_id = '';
        $category_product = DB::table('product')->select('category_id')->find($id);
        if ($category_product) {
            $category_id = ((array)$category_product)['category_id'];
            $category = DB::table('category')->select('id', 'parent_id')->where('parent_id', '!=', '')->pluck('parent_id', 'id');
            $category_selected[] = (string)$category_id;
            $this->category_selected($category_selected, $category, $category_id);
        }
        $data['other_config']['category_selected'] = $category_selected;
        $obj = reports_form_edit_data($id, $data);
        return View::make('report/data_form')->with('obj', $obj);
    }

    public function update(Request $request)
    {
        $requestData = $request->all();
        $id = isset($requestData['formData']['id']) ? $requestData['formData']['id'] : '';
        $message = $this->validate_product($id, $request);
        if ($message) {
            return [
                'status' => 'error',
                'message' => $message,
            ];
        }
        $return = reports_form_update($this->data_config(), $requestData);
        $this->product_images($requestData, $return);
        return $return;
    }

    public function destroy($id)
    {
        // return reports_form_destroy($id, $this->data_config());
    }

    public function validate_product($id, $request)
    {
        $message = [];
        return $message;
    }

    public function product_images($requestData, $return)
    {
        $multi_image = $requestData['dataMultiImage'];
        if (isset($multi_image['image']) && $multi_image['image']) {
            $images = [];
            $date_now = date('Y-m-d H:i:s');
            $folder = 'images/pages/1/';
            foreach ($multi_image['image'] as $key => $value) {
                if ($value) {
                    $img = [];
                    $name = time() . '_' . $key . '.' . get_filename_extension($value);
                    Image::make($value)->save(public_path('images/pages/1/') . $name);
                    $path = '/' . $folder . $name;
                    $img['product_id'] = $return['id'];
                    $img['url'] = $path;
                    $img['active'] = 1;
                    $img['created_at'] = $date_now;
                    $img['updated_at'] = $date_now;
                    $images[] = $img;
                }
            }
            if ($images) {
                $chunk_size = floor(2100 / count($images[0])) - 5;
                if ($chunk_size < 1) {
                    $chunk_size = 1;
                }
                foreach (array_chunk($images, $chunk_size) as $mark_piece) {
                    product_img::insert($mark_piece);
                }
            }
        }
        $image_update = isset($requestData['dataMultiImageUpdate']) ? $requestData['dataMultiImageUpdate'] : [];
        if (isset($image_update['image']) && $image_update['image']) {
            DB::table('product_img')->whereIn('id', $image_update['image'])->update(['active' => 0]);
        }
    }

    public function category()
    {
        $category_db = DB::table('category')->select('id', 'category', 'parent_id')->orderBy('id', 'asc')->get();
        $category = [];
        $category_rest = [];
        foreach ($category_db as $key => $value) {
            $category_arr = (array)$value;
            if (!$category_arr['parent_id']) {
                $arr = [];
                $arr['id'] = $category_arr['id'];
                $arr['label'] = $category_arr['category'];
                $category[$category_arr['id']] = $arr;
            } else {
                $category_rest[] = $category_arr;
            }
        }
        $this->category_map($category, $category_rest);
        return $category;
    }

    public function category_map(&$this_parent, &$category_rest)
    {
        foreach ($this_parent as $key => $value) {
            foreach ($category_rest as $k_2 => $val_2) {
                if ($key == $val_2['parent_id']) {
                    $child = [];
                    $child['id'] = $val_2['id'];
                    $child['label'] = $val_2['category'];
                    $this_parent[$key]['items'][$val_2['id']] = $child;
                    unset($category_rest[$k_2]);
                }
            }
            if (isset($this_parent[$key]['items'])) {
                $this->category_map($this_parent[$key]['items'], $category_rest);
            }
        }
    }

    public function category_selected(&$category_selected, $category, $key)
    {
        if (isset($category[$key])) {
            $category_selected[] = (string)$category[$key];
            $this->category_selected($category_selected, $category, $category[$key]);
        }
    }
}
