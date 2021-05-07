<template>
    <div class="text-center app-in">
        <form v-on:submit.prevent class="form-sign-in">
            <!--<img v-bind:src="'/images/logo-login.png'" alt="logo" class="mb-2"/>-->
            <div class="text-danger mt-1 mb-2 message">
                <span>{{error}}</span>
            </div>
            <label for="inputUsername" class="sr-only">Email address</label>
            <input name="username" v-model="username" type="text" id="inputUsername" class="form-control" placeholder="Tài khoản" required autofocus>
            <label for="inputPassword" class="sr-only">Password</label>
            <input name="password" v-model="password" type="password" id="inputPassword" class="form-control" placeholder="Mật khẩu" required>
            <button @click="submit" :disabled="isDisabled" class="btn btn-lg btn-primary btn-block" type="submit">
                <span :class="{'d-none': !isDisabled}" class="spinner-grow spinner-grow-sm mb-1" role="status" aria-hidden="true"></span>
                <span>Đăng nhập</span>
            </button>
            <p class="mt-5 mb-3 text-muted">© 2021</p>
        </form>
    </div>
</template>
<style scoped>
    .app-in {
        height: 100%;
        display: flex;
        align-items: center;
        padding-top: 40px;
        padding-bottom: 40px;
        background-color: #f5f5f5;
    }
    .form-sign-in {
        width: 100%;
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }
    .form-sign-in input[name="username"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-sign-in input[name="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .message {
        min-height: 23px;
    }
</style>
<script>
    export default {
        data() {
            return {
                username: '',
                password: '',
                error: '',
                isDisabled: false
            }
        },
        methods: {
            submit() {
                this.error = '';
                if (!this.username || !this.password) {
                    this.error = 'Tài khoản và mật khẩu không được để trống!';
                } else {
                    this.isDisabled = true;
                    axios.post('/login', {
                        username: this.username,
                        password: this.password
                    }).then(response => {
                        if (response.data === 'success') {
                            window.location.href = '/admin';
                        } else {
                            this.error = response.data
                        }
                        let self = this;
                        setTimeout(function () {
                            self.isDisabled = false;
                        }, 500);
                    }).catch(error => {
                        // console.log(error);
                    })
                }
            }
        }
    }
</script>
