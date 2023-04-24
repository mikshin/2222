<template>
    <main>
        <!-- восстановление пароля -->
        <div class="authorization authorization--password-recovery">
            <div class="authorization-logo">
                <!-- TODO: Надо переделать картинку на локал -->
                <img src="https://user-images.githubusercontent.com/43563530/109798854-4d2afc00-7c2c-11eb-9db2-c8444e247e37.png"
                    alt="logo" width="116" height="116">
            </div>
            <h3 class="authorization-title">Восстановление пароля</h3>
            <p v-if="status===null">Пароль будет выслан на Вашу электронную почту</p>
            <p v-if="status===true">Пароль выслан на Вашу электронную почту</p>
            <p v-if="status===false" class="password-recovery-error">Пользователь с такой почтой не найден</p>
            <form @submit="checkForm" novalidate="true" v-if="status===null || status===false">
                <input-template :type="'email'" :placeholder="'Почта'" :errors="this.emailErrors"
                    :onInput="onInputEmail" :required="'requred'" />
                <router-link class="forget-password" to="/registration">Ещё не зарегистрированы?</router-link>
                <div class="button-wrapper">
                    <button-template class="button-primary" :type="'submit'" :text="'Восстановить пароль'" />
                    <router-link class="button button-secondary" to="/registration">Войти</router-link>
                </div>
            </form>
            <div class="button-wrapper button-wrapper--center" v-if="status===true">
                <router-link class="button button-primary" to="/registration" @click="status===null">Авторизоваться</router-link>
            </div>
        </div>
    </main>
</template>
<script>
    import InputTemplate from '../../ui/inputTemplate.vue'
    import ButtonTemplate from '../../ui/buttonTemplate'

    export default {
        data() {
            return {
                errors: [],
                emailErrors: [],
                passwordErrors: [],
                email: null,
                password: null,
                terms: false,
                status: null
            }
        },
        components: {
            InputTemplate,
            ButtonTemplate
        },
        computed: {
            isDisabled: function () {
                return !this.terms
            }
        },
        methods: {
            onTermsChecked(data) {
                if (data.termValue) {
                    this.terms = false
                } else {
                    this.terms = true
                }
            },
            checkForm: function (e) {
                this.errors = []
                this.emailErrors = []
                this.passwordErrors = []


                if (!this.email) {
                    this.errors.push('Необходимо указать почту')
                    this.emailErrors.push('Необходимо указать почту')
                } else if (!this.validEmail(this.email)) {
                    this.errors.push('Укажите корректный адрес электронной почты.')
                    this.emailErrors.push('Укажите корректный адрес электронной почты.')
                }

                if (!this.password) {
                    this.errors.push('Необходимо указать пароль')
                    this.passwordErrors.push('Необходимо указать пароль')
                }

                if (!this.errors.length) {
                    this.successRegistration = true
                    return true;
                }

                // TODO: удалить после полноценной настройки

                if (this.email === 'test@test.ru') {
                    this.status = true
                } else {
                    this.status = false
                }
                // console.log(status)

                e.preventDefault();
            },

            validEmail: function (email) {
                var re =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },
            onInputEmail(data) {
                this.email = data.value
            },
            onInputPassword(data) {
                this.password = data.value
            },
            changeStatus(data) {
                this.status = data
            }
        }
    }
</script>

<style lang="scss">
    .authorization {
        background: #fff;
        width: 624px;
        min-height: 500px;
        padding: 96px 80px 42px 80px;
        box-sizing: border-box;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        box-shadow: 0px 4px 20px rgba(117, 28, 35, 0.25);
        border-radius: 2px;
        p{
            text-align: center;
        }
    }

    .authorization-logo {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        display: block;
        position: absolute;
        top: -80px;
        left: 50%;
        transform: translatex(-50%);
        background-color: #fff;

        img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
        }
    }

    .authorization-title {
        font-weight: 600;
        font-size: 48px;
        line-height: 48px;
        color: #751C23;
        text-align: center;
        margin-top: 0;
        margin-bottom: 40px;
    }

    .forget-password {
        display: block;
        margin-top: 4px;
        text-decoration: none;
        font-weight: 300;
        font-size: 16px;
        line-height: 24px;
        text-align: right;
        color: #0735AA;

        &:hover {
            text-decoration: underline;
        }
    }

    .password-recovery-error {
        color: #CB0818;
    }

    .authorization--password-recovery-success p {
        font-size: 18px;
        line-height: 21px;
        text-align: center;
        margin-bottom: 172px;
    }

    
    .button-wrapper {
        &.button-wrapper--center {
            margin-top: 120px;
            justify-content: center;
        }
    }
</style>