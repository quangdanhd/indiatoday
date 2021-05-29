<template>
    <div>
        <div v-if="formSubmit" class="report-loader">
            <div class="lds-spinner">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <!--message & error-->
        <div v-if="!!message">
            <div class="alert alert-success alert-dismissible">
                <span @click="closeMessage" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong>Success!</strong>
                <span v-html="message"></span>
            </div>
        </div>
        <div v-if="!!error">
            <div class="alert alert-danger alert-dismissible">
                <span @click="closeError" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong>Warning!</strong>
                <span v-html="error"></span>
            </div>
        </div>
        <form @submit="submitData($event)" :disabled="formSubmit" novalidate="novalidate" class="needs-validation">
            <div class="form-group row">
                <div class="col-5 col-md-2 col-lg-2">
                    <label class="w-100 mb-0">Danh mục</label>
                </div>
                <div class="col-7 col-md-10 col-lg-10">
                    <label class="w-100 mb-0">Link <i>https://www.indiatoday.in/...</i></label>
                </div>
            </div>
            <div v-for="i in line" :key="i" class="form-group row">
                <div class="col-5 col-md-2 col-lg-2">
                    <label class="w-100 mb-0">
                        <select v-model="dataLink[(i - 1)]['select']" :required="!!dataLink[(i - 1)]['link'] || i === 1" class="form-control form-control-sm">
                            <option value>{{$t('button.option_none')}}</option>
                            <option v-for="(option, key) in category" :key="key" :value="key">
                                {{option}}
                            </option>
                        </select>
                    </label>
                </div>
                <div class="col-7 col-md-10 col-lg-10">
                    <label class="w-100 mb-0">
                        <input @keyup="changeLink" v-model="dataLink[(i - 1)]['link']" :required="i === 1" type="text" class="form-control form-control-sm">
                    </label>
                </div>
            </div>
            <div class="text-center mt-3">
                <button class="btn btn-primary w-25" type="submit" :disabled="formSubmit">
                    <span v-if="formSubmit" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span>Xác nhận</span>
                </button>
            </div>
        </form>
    </div>
</template>
<script>
    export default {
        props: [
            'obj'
        ],
        data() {
            return {
                message: '',
                error: '',
                url: this.obj['url'],
                line: this.obj['line'],
                category: this.obj['category'],
                dataLink: {},
                formSubmit: false,
            }
        },
        created() {
            for (let i = 0; i < this.line; i++) {
                this.dataLink[i] = {
                    'select': '',
                    'link': '',
                };
            }
        },
        methods: {
            closeMessage() {
                this.message = '';
            },
            closeError() {
                this.error = '';
            },
            clearNotify() {
                this.message = '';
                this.error = '';
            },
            changeLink() {
                this.$forceUpdate();
            },
            submitData(event) {
                event.preventDefault();
                if ($('form.needs-validation')[0].checkValidity() === true) {
                    this.clearNotify();
                    this.formSubmit = true;
                    axios.post(this.url, {
                        dataLink: this.dataLink,
                    }).then(response => {
                        let res = response.data;
                        if (res['status'] === 'success') {
                            this.message = res['message'];
                        } else {
                            this.error = res['message'];
                        }
                        this.formSubmit = false;
                    }).catch(error => {
                        this.error = error.response.data.message;
                        this.formSubmit = false;
                    });
                } else {
                    this.error = 'Chưa nhập đủ thông tin!';
                }
            },
        }
    }
</script>
