<template>
    <div class="container-fluid pt-2 pb-2">
        <h4>Settings</h4>
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
        <div v-if="message !== ''">
            <div class="mb-0 alert alert-success alert-dismissible">
                <span @click="closeMessage" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong>Success!</strong>
                <span v-html="message"></span>
            </div>
        </div>
        <div v-if="error !== ''">
            <div class="mb-0 alert alert-danger alert-dismissible">
                <span @click="closeError" class="close cursor-pointer" aria-label="close">&times;</span>
                <strong>Warning!</strong>
                <span v-html="error"></span>
            </div>
        </div>
        <form @submit="submitDataForm($event)" class="mb-3 needs-validation" novalidate :disabled="formSubmit">
            <div class="form-row">
                <div class="col-md-4 mb-3">
                    <label for="language">Language
                        <span class="text-danger">*</span>
                    </label>
                    <select v-model="language_selected" id="language" name="language" required="required" class="form-control form-control-sm">
                        <option value="">Default</option>
                        <option v-for="(item, key) in language" :value="key">{{item}}</option>
                    </select>
                </div>
            </div>
            <div class="mt-3">
                <button type="submit" class="btn btn-primary" :disabled="formSubmit">
                    <span v-if="formSubmit" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    <span>Save</span>
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
                formSubmit: false,
                language: '',
                language_selected: '',
            }
        },
        created() {
            this.language = this.obj['language'];
            this.language_selected = this.obj['language_selected'];
        },
        methods: {
            closeMessage() {
                this.message = '';
            },
            closeError() {
                this.error = '';
            },
            submitDataForm(e) {
                e.preventDefault();
                let form = $('form.needs-validation');
                if (form[0].checkValidity() === true) {
                    this.formSubmit = true;
                    this.message = '';
                    this.error = '';
                    axios.post('settings', {
                        language_selected: this.language_selected,
                    }).then(response => {
                        if (response.data['status'] === 'success') {
                            this.message = response.data['message'];
                            this.formSubmit = false;
                        } else {
                            this.formSubmit = false;
                        }
                        this.formSubmit = false;
                    }).catch(error => {
                        this.error = error.response.data.message;
                        this.formSubmit = false;
                    })
                } else {
                    form.addClass('was-validated');
                    this.error = 'The information entered is incorrect or is not allowed to be left blank. Please check again!';
                }
            }
        }
    }
</script>
