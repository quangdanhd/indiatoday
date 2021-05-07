<template>
    <div>
        <input @change="onMultiImageChange($event)" :ref="'file_upload_' + f_name" type="file" class="form-control-file form-control-sm p-0" accept="image/*">
        <div v-if="f_name in MultiImageNewUrl || f_name in dataMultiImageDB" class="row mt-2 img-multi-container">
            <!--edit-->
            <div v-for="(item, key) in dataMultiImageDB[f_name]" :key="f_name + key + 'img-mul-edit'" class="col-sm-4 col-lg-3 mb-2 image-preview position-relative">
                <img :src="item" alt="" class="img w-100 img-multi" :class="{'img-del': f_name in dataMultiImageUpdate && dataMultiImageUpdate[f_name].includes(key)}"/>
                <i v-if="f_name in dataMultiImageUpdate && dataMultiImageUpdate[f_name].includes(key)" @click="removeMultiImageDB(key)" class="fas fa-reply remove-image"></i>
                <i v-else @click="removeMultiImageDB(key)" class="far fa-trash-alt remove-image"></i>
            </div>
            <!--add_new-->
            <div v-for="(item, key) in MultiImageNewUrl[f_name]" :key="f_name + key + 'img-mul-new'" class="col-sm-4 col-lg-3 mb-2 image-preview position-relative">
                <img :src="item" alt="" class="img w-100 img-multi"/>
                <i @click="removeMultiImage(key)" class="far fa-trash-alt remove-image"></i>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            'f_name',
        ],
        data() {
            return {
                MultiImageNewUrl: {},
            }
        },
        methods: {
            onMultiImageChange(e, f_name) {
                let file = e.target.files[0];
                let size = 2; // MB
                let check_size = file.size < (size * 1024 * 1024);
                this.$store.commit('form/onFieldMultiImageChange', {e: e, f_name: this.f_name, check_size: check_size});
                if (check_size) {
                    let arr = [];
                    if (this.f_name in this.MultiImageNewUrl) {
                        arr = this.MultiImageNewUrl[this.f_name];
                    }
                    arr.push(URL.createObjectURL(file))
                    this.MultiImageNewUrl[this.f_name] = arr;
                    this.$forceUpdate();
                } else {
                    let ref = 'file_upload_' + this.f_name;
                    alert(this.$t('message.image_error_max_size') + size + 'MB!');
                    this.$refs[ref].value = null;
                }
            },
            removeMultiImage(key) {
                this.$store.commit('form/removeMultiImage', {f_name: this.f_name, key: key});
                if (this.f_name in this.MultiImageNewUrl) {
                    this.MultiImageNewUrl[this.f_name].splice(key, 1);
                    this.$forceUpdate();
                }
            },
            removeMultiImageDB(key) {
                this.$store.commit('form/removeMultiImageDB', {f_name: this.f_name, key: key});
                this.$forceUpdate();
            }
        },
        computed: {
            dataModel() {
                return this.$store.state.form.dataModel;
            },
            dataMultiImage() {
                return this.$store.state.form.dataMultiImage;
            },
            dataMultiImageDB() {
                return this.$store.state.form.dataMultiImageDB;
            },
            dataMultiImageUpdate() {
                return this.$store.state.form.dataMultiImageUpdate;
            },
        }
    }
</script>
