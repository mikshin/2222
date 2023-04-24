<template>
    <!-- checkbox, radiobutton -->
    <label @click="checking" class="checkbox-container">
        <input class="visually-hidden" :type="type" v-model="termsValue">
        <div class="fake-checkbox"></div>
        <span v-show="!terms">{{content}}</span>
        <span v-show="terms">Согласен на обработку <a href="#"> персональных данных</a></span>
    </label>
</template>
<script>
    export default {
        data() {
            return {
                termsValue: false
            }
        },
        props: {
            type: null,
            checked: null,
            content: null,
            terms: null,
            onTermsChecked: null
        },
        methods: {
            checking() {
                this.onTermsChecked({
                    termValue: this.termsValue
                })
            }
        }
    }
</script>

<style lang="scss">

</style>

<style lang="scss" scoped>
    .checkbox-container {
        display: block;
        margin-top: 62px;
        position: relative;
        cursor: pointer;

        span {
            padding-left: 40px;
            font-weight: 300;
            font-size: 18px;
            line-height: 27px;
        }

        .fake-checkbox {
            &:before {
                content: '';
                position: absolute;
                top: 50%;
                left: 0;
                width: 24px;
                height: 24px;
                box-sizing: border-box;
                border: 1.5px solid #9CA6AB;
                border-radius: 2px;
                transform: translateY(-50%);
                transition: .3s all ease;
            }

            &:after {
                content: none;
                display: block;
                width: 14px;
                height: 7px;
                border: 2px solid #fff;
                border-top: 0;
                border-right: 0;
                transform: rotate(-45deg);
                position: absolute;
                left: 4px;
                top: 6px;
                transition: .3s all ease;
            }

            &:hover:before {
                border: 1.5px solid #000000;
            }
        }

        a {
            text-decoration: none;
            color: #0735AA;
            &:hover {
                text-decoration: underline;
            }
        }

        input {
            &:checked+.fake-checkbox::before {
                background: #000000;
                border: none;
            }

            &:checked+.fake-checkbox::after {
                content: '';
            }

            &:focus+.fake-checkbox::before {
                border-color: #000
            }
        }

    }
</style>