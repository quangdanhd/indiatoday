<?=
'<?xml version="1.0" encoding="UTF-8"?>' . PHP_EOL
?>
<rss version="2.0">
    <channel>
        <title><![CDATA[ Mekong24h ]]></title>
        <link>
        <![CDATA[ https://mekong24h.xyz/feed ]]></link>
        <description><![CDATA[ Check out the latest news around the world. ]]></description>
        <language>vi</language>
        <pubDate>{{ now() }}</pubDate>
        @foreach($posts as $post)
            <item>
                <title><![CDATA[{{ $post->title }}]]></title>
                <link>https://mekong24h.xyz/{{ $post->url }}</link>
                <description><![CDATA[{!! $post->describe !!}]]></description>
                <category>{{ $post->name }}</category>
                <author><![CDATA[ admin ]]></author>
                <guid>{{ $post->id }}</guid>
                <pubDate>{{ $post->created_at->toRssString() }}</pubDate>
            </item>
        @endforeach
    </channel>
</rss>
