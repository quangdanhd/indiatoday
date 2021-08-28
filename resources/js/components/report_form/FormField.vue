<template>
    <div>
        <div v-for="(item, key) in fields" :key="key + 'field'" class="form-group row">
            <div v-if="objData['field'][item] === config['image'] || objData['field'][item] === config['view_image']" class="col-sm-12 mb-1 text-center image-preview position-relative">
                <img v-if="item in ImageUrl && ImageUrl[item]" :src="ImageUrl[item]" alt="" class="img"/>
                <img v-else-if="dataModel[item]" :src="dataModel[item]" @error="imageUrlAlt" alt="" class="img"/>
                <i v-if="objData['field'][item] === config['image'] && ((item in ImageUrl && ImageUrl[item]) || dataModel[item])" @click="removeImage(item)" class="far fa-trash-alt remove-image"></i>
            </div>
            <label v-if="fieldShowCheck(item)" class="col-sm-4 col-form-label col-form-label-sm">
                <span v-if="typeof objData['label'][item] !== 'undefined'">
                    {{$t('database.' + objData['label'][item])}}
                </span>
                <span v-else>
                    {{$t('database.' + item)}}
                </span>
                <span v-if="objData['required'].includes(item)" class="text-danger">*</span>
            </label>
            <div v-if="showChecked[item]" class="col-sm-8" :class="{'col-sm-12': [config['tiny_mce'], config['multiple_image']].includes(objData['field'][item])}">
                <!--text-->
                <label v-if="objData['field'][item] === config['text']" class="w-100 mb-0">
                    <input type="text" :name="item" v-model="dataModel[item]" class="form-control form-control-sm" :required="objData['required'].includes(item)">
                </label>
                <!--integer-->
                <label v-else-if="objData['field'][item] === config['integer']" class="w-100 mb-0">
                    <input type="number" :name="item" v-model="dataModel[item]" min="0" step="1" class="form-control form-control-sm text-right" :required="objData['required'].includes(item)">
                </label>
                <div v-else-if="objData['field'][item] === config['decimal']" class="input-group input-group-sm">
                    <div class="input-group-prepend w-50">
                        <span class="input-group-text w-100">{{dataModel[item].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</span>
                    </div>
                    <input type="number" :name="item" v-model="dataModel[item]" class="form-control form-control-sm text-right" :required="objData['required'].includes(item)">
                </div>
                <!--boolean-->
                <label v-else-if="objData['field'][item] === config['boolean']" class="mb-0 label-checkbox">
                    <input type="checkbox" :name="item" v-model="dataModel[item]" :required="objData['required'].includes(item)">
                </label>
                <!--date-->
                <label v-else-if="objData['field'][item] === config['date']" class="w-100 mb-0">
                    <input type="date" :name="item" v-model="dataModel[item]" class="form-control  form-control-sm" :required="objData['required'].includes(item)">
                </label>
                <!--datetime-->
                <label v-else-if="objData['field'][item] === config['datetime']" class="w-100 mb-0">
                    <input type="datetime-local" :name="item" :value="dataModel[item] | reportDateTimeConverter()" @input="updateDateTimeLocal(item, $event.target.value)" class="form-control form-control-sm" :required="objData['required'].includes(item)">
                </label>
                <!--time-->
                <label v-else-if="objData['field'][item] === config['time']" class="w-100 mb-0">
                    <input type="time" step="1" :name="item" v-model="dataModel[item]" class="form-control form-control-sm" :required="objData['required'].includes(item)">
                </label>
                <!--month-->
                <label v-else-if="objData['field'][item] === config['month']" class="w-100 mb-0">
                    <input type="month" :name="item" v-model="dataModel[item]" class="form-control form-control-sm" :required="objData['required'].includes(item)">
                </label>
                <!--select-->
                <label v-else-if="objData['field'][item] === config['select']" class="w-100 mb-0">
                    <select v-model="dataModel[item]" :name="item" class="form-control form-control-sm" :required="objData['required'].includes(item)">
                        <option value v-if="!objData['required'].includes(item)">{{$t('button.option_none')}}</option>
                        <option v-for="(option, op_key) in objData['select'][item]" :key="op_key + 'option'" :value="op_key">
                            {{option}}
                        </option>
                    </select>
                </label>
                <!--textarea-->
                <label v-else-if="objData['field'][item] === config['textarea']" class="w-100 mb-0">
                    <textarea :name="item" v-model="dataModel[item]" class="form-control form-control-sm" :required="objData['required'].includes(item)">{{dataModel[item]}}</textarea>
                </label>
                <!--reference-->
                <InputReference v-else-if="objData['field'][item] === config['reference']" :reference="objData['reference']" :f_name="item" i_value="" ref_value=""/>
                <!--search_popup-->
                <InputSearchPopup v-else-if="objData['field'][item] === config['search_popup']" :obj="obj" :f_name="item"/>
                <!--primaryKey-->
                <InputPrimaryKey v-else-if="objData['field'][item] === config['primaryKey']" :obj="obj" :f_name="item"/>
                <!--password-->
                <label v-else-if="objData['field'][item] === config['password']" class="w-100 mb-0">
                    <input type="text" :name="item" v-model="dataModel[item]" class="form-control form-control-sm" :required="objData['required'].includes(item)">
                </label>
                <!--view-->
                <div v-else-if="objData['field'][item] === config['view']" class="w-100 mb-0">
                    <div v-if="typeof dataView[item] !== 'undefined'">
                        <span v-if="typeof dataView[item][dataModel[item]] !== 'undefined'">
                            {{$te('field_view.' + dataView[item][dataModel[item]]) ? $t('field_view.' + dataView[item][dataModel[item]]) : dataView[item][dataModel[item]]}}
                        </span>
                        <span v-else>
                            <span v-if="typeof dataView[item]['none'] !== 'undefined'">
                                {{$te('field_view.' + dataView[item]['none']) ? $t('field_view.' + dataView[item]['none']) : dataView[item]['none']}}
                            </span>
                            <span v-else>Config not found [{{item}}]['none']!</span>
                        </span>
                    </div>
                    <div v-else>
                        {{dataModel[item]}}
                    </div>
                </div>
                <!--view_search_popup-->
                <div v-else-if="objData['field'][item] === config['view_search_popup']" class="w-100 mb-0">
                    <span v-if="typeof dataModelPopup[item] !== 'undefined'">
                        {{dataModelPopup[item]}}
                    </span>
                    <span v-else>
                        {{dataModel[item]}}
                    </span>
                </div>
                <!--view_select-->
                <div v-else-if="objData['field'][item] === config['view_select']" class="w-100 mb-0">
                    <span v-if="typeof objData['select'][item][dataModel[item]] !== 'undefined'" class="text-capitalize">
                        {{objData['select'][item][dataModel[item]]}}
                    </span>
                    <span v-else>
                        {{dataModel[item]}}
                    </span>
                </div>
                <!--view_boolean-->
                <div v-else-if="objData['field'][item] === config['view_boolean']" class="w-100 mb-0">
                    <i v-if="dataModel[item]" class="fas fa-check"></i>
                </div>
                <!--image-->
                <label v-else-if="objData['field'][item] === config['image']" class="w-100 mb-0">
                    <input @change="onImageChange($event, item)" :ref="'file_upload_' + item" type="file" :name="item" accept="image/*" :required="objData['required'].includes(item)">
                </label>
                <!--view_image-->
                <label v-else-if="objData['field'][item] === config['view_image']" class="w-100 mb-0">
                </label>
                <!--tiny_mce-->
                <label v-else-if="objData['field'][item] === config['tiny_mce']" v-else class="w-100 mb-0">
                    <editor v-model="dataModel[item]" :init="{
                         height: 300,
                         menubar: false,
                         branding: false,
                         plugins: [
                            'advlist autolink lists link image charmap print preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount',
                         ],
                         toolbar: 'undo redo | formatselect | forecolor | bold italic underline backcolor | \ alignleft aligncenter alignright alignjustify | \ bullist numlist outdent indent | removeformat | link image | code | fullscreen | help',
                         entity_encoding: 'raw',
                    }"/>
                </label>
                <!--multiple_image-->
                <InputMultipleImage v-else-if="objData['field'][item] === config['multiple_image']" :f_name="item"/>
                <!--default-->
                <label v-else class="w-100 mb-0">
                    <input type="text" :name="item" v-model="dataModel[item]" class="form-control form-control-sm" :required="objData['required'].includes(item)" placeholder="Chưa có config!!!">
                </label>
            </div>
        </div>
    </div>
</template>
<script>
    import InputReference from './InputReference';
    import InputSearchPopup from './InputSearchPopup';
    import InputMultipleImage from './InputMultipleImage';
    import InputPrimaryKey from './InputPrimaryKey';
    import Editor from '@tinymce/tinymce-vue';

    export default {
        components: {
            InputReference,
            InputSearchPopup,
            InputPrimaryKey,
            InputMultipleImage,
            'editor': Editor,
        },
        props: [
            'config',
            'obj',
            'fields'
        ],
        data() {
            return {
                ImageUrl: {},
                showChecked: {},
            }
        },
        methods: {
            updateDateTimeLocal(name, value) {
                this.$store.commit('form/updateDateTimeLocalValue', {name: name, value: value});
            },
            onImageChange(e, f_name) {
                let file = e.target.files[0];
                let size = 3; // MB
                let check_size = file.size < (size * 1024 * 1024);
                this.$store.commit('form/onFieldImageChange', {e: e, f_name: f_name, check_size: check_size});
                if (check_size) {
                    this.ImageUrl[f_name] = URL.createObjectURL(file);
                    this.$forceUpdate();
                } else {
                    let ref = 'file_upload_' + f_name;
                    alert('Ảnh quá lớn, chọn ảnh có dung lượng < ' + size + 'MB!');
                    this.$refs[ref][0].value = null;
                }
            },
            removeImage(f_name) {
                this.$store.commit('form/removeFieldImage', f_name);
                let ref = 'file_upload_' + f_name;
                this.$refs[ref][0].value = null;
                if (f_name in this.ImageUrl) {
                    delete this.ImageUrl[f_name];
                    this.$forceUpdate();
                }
            },
            fieldShow(f_name) {
                if (typeof this.dependenceConfig['field'] === 'undefined') {
                    return true;
                }
                if (typeof this.dependenceConfig['field'][f_name] === 'undefined') {
                    return true;
                }
                let dep = this.dependenceConfig['field'][f_name];
                let show = this.dependenceConfig['allow'][f_name][dep];
                show = show.map(x => x.toString());
                let val = this.dataModel[dep] !== null ? this.dataModel[dep].toString() : '';
                return !!show.includes(val);
            },
            fieldShowCheck(f_name) {
                this.showChecked[f_name] = this.fieldShow(f_name);
                return this.showChecked[f_name];
            },
            imageUrlAlt(event) {
                event.target.src = '/images/media/img_not_found.jpg';
            }
        },
        computed: {
            record() {
                return this.$store.state.form.record;
            },
            objData() {
                return this.$store.state.form.objData;
            },
            dataModel() {
                return this.$store.state.form.dataModel;
            },
            dataView() {
                return this.$store.state.form.dataView;
            },
            dataModelPopup() {
                return this.$store.state.form.dataModelPopup;
            },
            dependenceConfig() {
                return this.$store.state.form.dependenceConfig;
            },
        },
        watch: {
            record() {
                if (Object.keys(this.ImageUrl).length) {
                    this.ImageUrl = {};
                }
            }
        }
    }
</script>
