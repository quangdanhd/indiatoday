<template>
    <div class="position-relative image-view" style="width: 100px; margin: 0 auto;">
        <img v-if="f_value" :src="imageHost + f_value" @error="imageError" alt="" class="img w-100"/>
        <img v-else src="/images/media/img_not_found.png" alt="" class="img w-100"/>
        <div v-if="f_value" class="image-zoom shadow-sm p-2 bg-white rounded">
            <img :src="imageHost + f_value" alt="" class="img w-100"/>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'tab_key',
            'f_name',
            'f_value',
        ],
        data() {
            return {
                haveImage: true,
            }
        },
        methods: {
            imageError(event) {
                this.haveImage = false;
                event.target.src = '/images/media/img_not_found.png';
            }
        },
        computed: {
            joinConfig() {
                return this.$store.state.form.joinConfig;
            },
            imageHost() {
                if (typeof this.joinConfig[this.tab_key]['image_host'] !== 'undefined' && typeof this.joinConfig[this.tab_key]['image_host'][this.f_name] !== 'undefined') {
                    return this.joinConfig[this.tab_key]['image_host'][this.f_name];
                } else {
                    return '';
                }
            },
        }
    }
</script>
