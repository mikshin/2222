<template>
    <main>
        <div class="registration">
            <div class="registration-logo">
                <!-- <img src="src/assets/images/logo.png" alt=""> -->
                <!-- TODO: Надо переделать картинку на локал -->
                <img src="https://user-images.githubusercontent.com/43563530/109798854-4d2afc00-7c2c-11eb-9db2-c8444e247e37.png"
                    alt="logo" width="116" height="116">
            </div>
            <h3 class="registration-title">Регистрация</h3>
            <form @submit="checkForm" novalidate="true" v-show="!successRegistration">
                <input-template :type="'text'" :placeholder="'Имя'" :onInput="onInputName" :errors="this.nameErrors" :required="'requred'" />
                <input-template :type="'mail'" :placeholder="'Adress@my.com'" :onInput="onInputMail"
                    :errors="this.emailErrors" />
                <checkbox-template :type="'checkbox'" :terms="true" :onTermsChecked='onTermsChecked' />
                <div class="button-wrapper">
                    <button-template class="button-primary" :type="'submit'" :text="'Зарегистрироваться'"
                        :disabled="isDisabled" />
                    <router-link class="button button-secondary" to="/login">Авторизация</router-link>
                </div>
            </form>
        </div>
        <div class="registration registration--success" v-show="successRegistration">
            <div class="registration-logo">
                <!-- <img src="src/assets/images/logo.png" alt=""> -->
                <!-- TODO: Надо переделать картинку на локал -->
                <img src="https://user-images.githubusercontent.com/43563530/109798854-4d2afc00-7c2c-11eb-9db2-c8444e247e37.png"
                    alt="logo" width="116" height="116">
            </div>
            <h3 class="registration-title">Регистрация</h3>
            <p class="text-primary">Вы успешно зарегистрировались!</p>
            <p class="text-secondary">Пароль для входа выслан на вашу почту</p>
            <div class="button-wrapper">
                <router-link class="button button-primary" to="/login">Авторизация</router-link>
            </div>
        </div>
    </main>
</template>
<script>
    import InputTemplate from '../../ui/inputTemplate'
    import CheckboxTemplate from '../../ui/checkboxTemplate'
    import ButtonTemplate from '../../ui/buttonTemplate'

    export default {
        data() {
            return {
                errors: [],
                nameErrors: [],
                emailErrors: [],
                name: null,
                email: null,
                terms: false,
                successRegistration: false
            }
        },
        components: {
            InputTemplate,
            CheckboxTemplate,
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
                this.nameErrors = []
                this.emailErrors = []

                if (!this.name) {
                    this.errors.push('Необходимо указать имя')
                    this.nameErrors.push('Необходимо указать имя')
                }

                if (!this.email) {
                    this.errors.push('Необходимо указать почту')
                    this.emailErrors.push('Необходимо указать почту')
                } else if (!this.validEmail(this.email)) {
                    this.errors.push('Укажите корректный адрес электронной почты.')
                    this.emailErrors.push('Укажите корректный адрес электронной почты.')
                }

                if (!this.errors.length) {
                    this.successRegistration = true
                    return true;
                }

                e.preventDefault();
            },

            validEmail: function (email) {
                var re =
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            },

            onInputName(data) {
                this.name = data.value
            },
            onInputMail(data) {
                this.email = data.value
            }
        }
    }
</script>

<style lang="scss" scoped>
    .registration {
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

        &.registration--success {
            .registration-title {
                margin-bottom: 24px;
            }

            .button-wrapper {
                margin-top: 184px;
                justify-content: center;

                button {
                    background: #000;
                }
            }
        }
    }

    .registration-logo {
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

    .registration-title {
        font-weight: 600;
        font-size: 48px;
        line-height: 48px;
        color: #751C23;
        text-align: center;
        margin-top: 0;
        margin-bottom: 40px;
    }

    .text-primary {
        font-weight: 300;
        font-size: 24px;
        line-height: 36px;
        text-align: center;
        margin: 0;
        margin-bottom: 16px;
    }

    .text-secondary {
        font-size: 18px;
        line-height: 21px;
        color: #9CA6AB;
        text-align: center;
        margin: 0;
    }
</style>