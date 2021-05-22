<div class="row">
    <section id="content" class="col-md-8" role="main">
        <a id="main-content"></a>
        <div class="front-end-breadcrumb"></div>
        <div class="story-section ">
            <article>
                <div class="node node-story view-mode-full">
                    @include('interface_detail.node_detail', ['node' => $obj['detail']])
                </div>
            </article>
        </div>
    </section>
    <aside class="sidebars col-md-4">
        <section class="region region-sidebar-second column sidebar">
            @include('interface_detail.sidebar', ['node' => $obj['detail']])
        </section>
    </aside>
</div>
