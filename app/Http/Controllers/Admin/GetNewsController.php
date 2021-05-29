<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\news;
use DOMXPath;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Route;

class GetNewsController extends Controller
{
    public function index()
    {
        $obj = [];
        if (request()->ajax()) {
            return $obj;
        }
        $obj['url'] = '/' . Route::getFacadeRoot()->current()->uri();
        $category = DB::table('news_category')->select('type', 'name')->orderBy('type', 'asc')->pluck('name', 'type')->toArray();
        $obj['category'] = $category;
        $obj['line'] = 5;
        return View::make('admin/get_news')->with('obj', $obj);
    }

    function store()
    {
        $req = request()->all();
        $dataLink = isset($req['dataLink']) ? $req['dataLink'] : [];
        if ($dataLink) {
            $links = [];
            foreach ($dataLink as $key => $value) {
                $link = isset($value['link']) ? $value['link'] : '';
                if (!in_array($link, $links)) {
                    $links[] = $link;
                }
            }
            $dataNew = [];
            $errors = [];
            $message = [];
            $message[] = 'Tạo mới tin tức thành công!';
            foreach ($dataLink as $key => $value) {
                $category = isset($value['select']) ? $value['select'] : '';
                $link = isset($value['link']) ? $value['link'] : '';
                if (!!$category && !!$link) {
                    preg_match('/^https:\/\/www.indiatoday.in\/.+/', $link, $check);
                    if ($check) {
                        $check_db = DB::table('news')->select('from_url')->whereIn('from_url', $links)->pluck('from_url')->toArray();
                        if (!in_array($link, $check_db)) {
                            $data_url = $this->get_data_from_url($link);
                            if ($data_url['status'] == 'success') {
                                $news = $data_url['data'];
                                $news['category_id'] = $category;
                                $news['from_url'] = $link;
                                $news['publish'] = 1;
                                $dataNew[] = $news;
                            } else {
                                $errors[] = 'Dòng ' . ($key + 1) . $data_url['message'];
                            }
                        } else {
                            $message[] = 'Dòng ' . ($key + 1) . ': đã có trong database, không tạo mới';
                        }
                    } else {
                        return [
                            'status' => 'error',
                            'message' => 'Link bài viết phải bắt đầu bằng https://www.indiatoday.in/',
                        ];
                    }
                }
            }
            if ($errors) {
                $errors = '<br>' . join('<br>', $errors);
                return [
                    'status' => 'error',
                    'message' => $errors,
                ];
            }
            foreach ($dataNew as $key => $value) {
                news::create($value);
            }
            if ($message) {
                $message = '<br>' . join('<br>', $message);
            }
            return [
                'status' => 'success',
                'message' => $message,
            ];
        } else {
            return [
                'status' => 'error',
                'message' => 'Không tìm thấy dữ liệu',
            ];
        }
    }

    function get_data_from_url($link)
    {
        $errors = [];
        $data = [];
        $text = file_get_contents($link);
        // make id story-right-replace for get content
        $text = preg_replace('/(class\=\")(story\-right\s*)\"/', 'id="story-right-replace"', $text);
        $text = trim($text);
        // dom
        $dom = new \DomDocument();
        @$dom->loadHTML($text);
        // xpath
        $xpath = new DOMXPath ($dom);
        // title
        $h1 = $dom->getElementsByTagName('h1');
        if ($h1->length != 1) {
            $errors[] = 'Không tìm thấy h1 (title)';
        } else {
            $h1 = $h1->item(0)->nodeValue;
            $data['title'] = $h1;
        }
        // describe
        $h2 = $dom->getElementsByTagName('h2');
        if (!$h2->length) {
            $errors[] = 'Không tìm thấy mô tả (describe)';
        } else {
            $h2 = $h2->item(0)->nodeValue;
            $data['describe'] = $h2;
        }
        // image
        $img = $xpath->query('/html/body//div[@class="stryimg"]/img');
        if ($img->length != 1) {
            $errors[] = 'Không tìm thấy ảnh đại diện (img)';
        } else {
            $img = $img->item(0)->getAttribute('data-src');
            $data['image'] = $img;
        }
        // *** Content ***
        $content = $xpath->query('/html/body//div[@id="story-right-replace"]');
        if ($content->length != 1) {
            $errors[] = 'Không tìm thấy nội dung (content)';
        } else {
            $this->clean_html_tags($xpath);
            $content = $content->item(0);
            $innerHTML = '';
            $children = $content->childNodes;
            foreach ($children as $child) {
                $innerHTML .= $content->ownerDocument->saveHTML($child);
            }
            $data['content'] = $innerHTML;
        }
        if ($errors) {
            $errors = '<br>' . join('<br>', $errors);
            return [
                'status' => 'error',
                'message' => $errors,
            ];
        } else {
            return [
                'status' => 'success',
                'data' => $data,
            ];
        }
    }

    function clean_html_tags(&$xpath)
    {
        // remove script & style
        $this->remove_html_tags($xpath, '//script');
        $this->remove_html_tags($xpath, '//style');
        // remove recommended
        $tags = '//div[contains(attribute::class, "story-recommended-chunk")]';
        $this->remove_html_tags($xpath, $tags);
        // remove story-add
        $tags = '//div[contains(attribute::class, "inline-story-add")]';
        $this->remove_html_tags($xpath, $tags);
        // remove iframe
        $this->remove_html_tags($xpath, '//iframe');
        // remove also see
        foreach ($xpath->query('//strong/a') as $e) {
            $e->parentNode->nodeValue = '';
        }
        // remove a href & target
        foreach ($xpath->query('//a') as $e) {
            $e->setAttribute('href', '#');
            $e->setAttribute('target', '');
        }
        // remove also read
        foreach ($xpath->query('//strong["ALSO READ: "]') as $e) {
            $e->parentNode->nodeValue = '';
        }
    }

    function remove_html_tags(&$xpath, $tags)
    {
        foreach ($xpath->query($tags) as $e) {
            // Delete this node
            $e->parentNode->removeChild($e);
        }
    }
}
