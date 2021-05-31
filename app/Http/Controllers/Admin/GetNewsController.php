<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\ControllerUsers;
use App\Models\news;
use DOMXPath;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Route;

class GetNewsController extends ControllerUsers
{
    public function access_origin()
    {
        header('Access-Control-Allow-Origin: https://www.indiatoday.in/');
    }

    public function create_news()
    {
        $this->access_origin();
        $req = request()->all();
        $data = $req;
        $link = $data['from_url'];
        $check_db = DB::table('news')->select('id')->where('from_url', $link)->first();
        if (!$check_db) {
            $content = $data['content'];
            // dom
            $dom = new \DomDocument();
            @$dom->loadHTML($content);
            // xpath
            $xpath = new DOMXPath ($dom);
            $this->clean_html_tags($xpath);
            $content_2 = $xpath->query('/html/body')->item(0);
            $innerHTML = '';
            $children = $content_2->childNodes;
            foreach ($children as $child) {
                $innerHTML .= $content_2->ownerDocument->saveHTML($child);
            }
            $data['content'] = $innerHTML;
            $data['publish'] = 1;
            news::create($data);
            return 'Tạo mới thành công!';
        } else {
            return 'Không tạo mới tin tức, đã tồn tại tin tức trong db!';
        }
    }

    public function category()
    {
        $this->access_origin();
        $category = DB::table('news_category')->select('type', 'name')->orderBy('type', 'asc')->pluck('name', 'type')->toArray();
        return $category;
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
