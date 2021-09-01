<?=
'<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL
?>
<rss version="2.0">
    <channel>
        <title>Mekong24h</title>
        <link>https://mekong24h.xyz</link>
        <description>Check out the latest news around the world.</description>
        <language>en-us</language>
        <pubDate>{{ now() }}</pubDate>
        @foreach($posts as $post)<item>
            <title>{{ $post->title }}</title>
            <link>https://mekong24h.xyz/{{ $post->url }}</link>
            <description>{{ $post->describe }}</description>
            <category>{{ $post->name }}</category>
            <author>admin</author>
            <guid>{{ $post->id }}</guid>
            <pubDate>{{ $post->created_at->toRssString() }}</pubDate>
        </item>
        @endforeach
    </channel>
</rss>
