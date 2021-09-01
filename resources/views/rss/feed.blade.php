<?=
'<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL
?>
<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
    <channel>
        <title>Mekong24h</title>
        <link>https://mekong24h.xyz</link>
        <description>Check out the latest news around the world.</description>
        <language>en-us</language>
        <pubDate>{{ now()->format(DateTime::RFC822) }}</pubDate>
        @foreach($posts as $post)<item>
            <title>{{ $post->title }}</title>
            <link>https://mekong24h.xyz/{{ $post->url }}</link>
            <description>{{ $post->describe }}</description>
            <category>{{ $post->name }}</category>
            <guid isPermaLink="true">https://mekong24h.xyz/{{ $post->url }}</guid>
            <pubDate>{{ $post->created_at->toRssString() }}</pubDate>
        </item>
        @endforeach
    </channel>
</rss>
