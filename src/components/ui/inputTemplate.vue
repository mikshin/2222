<template>

    <label class="input-container" v-bind:class="classes">
        <!-- text, password, textarea -->
        <div v-if="type==='text' || type==='password' || type==='textarea' || type==='email'">
            <input :type='inputType' 
            :value='value' 
            @input="input, localSave()" 
            v-model="newValue" 
            placeholder=" "
            :name="name"
            :required="required">
            <span>{{ placeholder }}</span>
            <button v-if="inputType==='password' || isPasswordShown" class="password-control"
                v-bind:class="{ view : isPasswordShown}" @click="showPassword"></button>
            <div v-if="info">{{info}}</div>
            <div v-if="!required" class="required">(Необязательно)</div>
        </div>

        <!-- date-->
        <!-- TODO: сделать ввод по маске -->
        <div v-if="type==='date'">
            <date-picker v-model="newValue" format="DD.MM.YYYY" type="date" placeholder=" " value-type="DD.MM.YYYY"
                @focus="dateFocus" @blur="dateBlur" @input="dateInput" @change="localSave()" :required="required"></date-picker>
            <span v-bind:class="{ active: dateFocusVariable }">{{ placeholder }}</span>
        </div>

        <!-- select -->

        <div v-if="type==='select'">
            <v-select :label="placeholder" :options="selectOptions" @input="localSave()" v-model="newValue" :required="required"/>
            <span>{{ placeholder }}</span>
        </div>

        <!-- radio -->
        <div v-if="type==='radio'" class="radio-wrapper">
            <span class="radio-placeholder">{{placeholder}}</span>
            <label v-for="radio in radioValue" :key="radio">
                <input class="visually-hidden" :type="type" :name="name" @change="localSave()" :value="radio"
                    v-model="newValue" :required="required">
                <div class="fake-input">{{ radio }}</div>
            </label>
        </div>

        <!-- checkbox -->
        <div v-if="type==='checkbox'">
            <label>
                <input class="visually-hidden" :type="type" :name="name" @change="localSave()" v-model="newValue" :required="required">
                <div class="fake-input">{{ placeholder}}</div>
            </label>
        </div>

        <!-- file -->
        <div v-if="type==='file'">
            <label class="file-container">
                <input class="visually-hidden" :type="type" :name="name" @input="fileInput,localSave()" v-model="file" :required="required">
                <span class="file-headline">Выбрать файл</span>
                <ul class="file-list">
                    <li v-if="!fileList">Файл не выбран</li>
                    <li v-if="fileList">{{ fileList }}</li>
                </ul>
            </label>
        </div>
        <div class="errors-wrapper">
                <div v-if="errors.length>0">
                    <div class="error" v-for="error in errors" :key="error">{{ error }}</div>
                </div>
                <div v-if="newErrors.length">
                    <div class="error" v-for="error in newErrors" :key="error">{{ error }}</div>
                </div>
            </div>
    </label>
</template>

<script>
    export default {
        data() {
            return {
                isPasswordShown: false,
                inputType: this.type,
                dateFocusVariable: false,
                file: null,
                fileList: null,
                valid: false,
                newErrors: [],
                newValue: localStorage.getItem(this.name)
            }
        },
        props: {
            type: null,
            placeholder: null,
            value: null,
            errors: null,
            onInput: null,
            radioValue: null,
            name: null,
            newClass: null,
            info: null,
            required: null,
            selectOptions: null
        },
        methods: {
            showPassword() {
                if (this.inputType === 'password') {
                    this.inputType = 'text'
                    this.isPasswordShown = true
                } else {
                    this.inputType = 'password'
                    this.isPasswordShown = false
                }
            },
            input() {
                this.onInput({
                    value: this.newValue
                })
                this.localSave()
            },
            dateFocus() {
                this.dateFocusVariable = true
            },
            dateBlur() {
                if (this.newValue === null) {
                    this.dateFocusVariable = false
                }
            },
            dateInput() {
                if (this.newValue === null) {
                    this.dateFocusVariable = false
                } else {
                    this.dateFocusVariable = true
                }
            },
            fileInput() {
                this.fileList = this.file.slice(12)
                this.localSave()
            },
            localSave() {
                localStorage.setItem(this.name, this.newValue)
                validateInput(this)
            }
        },
        mounted() {
            // проверка для датапикера
            if (this.type === 'date' && localStorage.getItem(this.name) != 'null' && localStorage.getItem(this.name)) {
                this.dateFocusVariable = true
            }
            // Проверка чекбокса
            if (this.type === 'checkbox' && this.newValue === 'false') {
                this.newValue = null 
                // TODO: надо пофиксить это, это какая-то дичь
            }
            
            // валидация при загрузке
            validateInput(this)
        },
        computed: {
            classes: function() {
                let tmp = ''
                if(this.newClass) {
                    tmp+=this.newClass + ' '
                }
                if(!this.valid) {
                    tmp+='input-container--error' + ' '
                }
                return tmp
            }
        }
    }
    function validateInput(input) {
        // валидация обязательных инпутов
        
        if(input.newValue === '') {
            if(input.required) {
                if(input.newValue.length < 1 ) {
                    input.valid = false
                    input.newErrors.push('Это поле обязательно для заполнения')
                } 
                if(input.newValue === null && input.newValue === 'null') {
                    input.valid = false
                    input.newErrors.push('Это поле обязательно для заполнения')
                }
            }
        } else {
            input.valid = true
            input.newErrors = []
        }
        // console.log(input.name)
        // валидация не обязательных инпутов
    }
</script>

<style lang="scss" scoped>
    .input-container {
        display: block;
        position: relative;
        width: 100%;

        &+& {
            margin-top: 24px;
        }

        span {
            position: absolute;
            left: 24px;
            top: 16px;
            font-size: 18px;
            line-height: 21px;
            color: #9CA6AB;
            transition: .3s all ease;
            pointer-events: none;

            &.active {
                font-size: 13px;
                top: -10px;
                background: #fff;
                padding: 0 2px;
            }
        }

        &.input-container--error {
            input {
                border: 1.5px solid #CB0818;
            }

            span {
                color: #CB0818;
            }
        }

        &.input-container--half {
            width: calc(50% - 16px);
            margin-right: 16px;
        }

        &.input-container--third {
            width: calc(33.33% - 16px);
        }

        &.input-container--newline {
            width: 100%;

            input {
                width: calc(50% - 8px);
            }
        }

        .error {
            color: #CB0818;
            padding-top: 2px;
            padding-bottom: 2px;
            font-size: 12px;
            line-height: 14px;
            text-align: right;
        }
    }

    input {
        width: 100%;
        min-height: 56px;
        max-height: 56px;
        padding: 16px 24px;
        box-sizing: border-box;
        border: 1.5px solid #9CA6AB;
        border-radius: 2px;
        position: relative;
        cursor: pointer;
        font-size: 18px;
        transition: .3s all ease;

        &:focus,
        &:hover {
            border: 1.5px solid #000000;
            outline: none;
        }

        &:focus~span {
            font-size: 13px;
            top: -10px;
            background: #fff;
            padding: 0 2px;
        }

        &:not(:placeholder-shown)~span {
            font-size: 13px;
            top: -10px;
            background: #fff;
            padding: 0 2px;
        }

        &[type='radio'] {
            &+.fake-input {
                position: relative;
                padding-left: 32px;
                cursor: pointer;

                &:before {
                    content: '';
                    width: 18px;
                    height: 18px;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    position: absolute;
                    border-radius: 18px;
                    border: 1px solid #222222;
                }

                &:after {
                    content: '';
                    width: 10px;
                    height: 10px;
                    left: 0;
                    top: 50%;
                    transform: translate(50%, -50%);
                    position: absolute;
                    border-radius: 18px;
                    background-color: #222;
                    opacity: 0;
                    transition: .3s opacity ease;
                }
            }

            &:checked {
                &+.fake-input:after {
                    opacity: 1;
                }
            }
        }

        &[type='checkbox'] {
            &+.fake-input {
                position: relative;
                padding-left: 32px;
                cursor: pointer;

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
                    top: calc(50% - 8px);
                    transition: .3s all ease;
                }
            }

            &:checked {
                &:checked+.fake-input::before {
                    background: #000000;
                    border: none;
                }

                &:checked+.fake-input::after {
                    content: '';
                }

                &:focus+.fake-input::before {
                    border-color: #000
                }
            }

            &:focus {
                &+.fake-input::before {
                    border-color: #000;
                }
            }
        }
    }

    span.radio-placeholder {
        top: 0;
        left: 0;
    }

    .radio-wrapper {
        height: 24px;
        display: flex;
        padding-top: 32px;

        label+label {
            margin-left: 36px;
        }
    }

    .password-control {
        position: absolute;
        top: 17px;
        right: 17px;
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url(https://snipp.ru/demo/495/no-view.svg) 0 0 no-repeat;
        opacity: 0.3;
        border: none;

        &.view {
            background: url(https://snipp.ru/demo/495/view.svg) 0 0 no-repeat;
            opacity: 1;
        }
    }

    .required {
        color: #9898AA;
        font-size: 12px;
        line-height: 14px;
        position: absolute;
        top: 0;
        right: 0;
        transform: translateY(-100%);
    }

    .file-container {
        height: 56px;
        width: 100%;
        border: 1px dashed #9898AA;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        cursor: pointer;

        .file-headline {
            font-size: 18px;
            line-height: 24px;
            color: #0735AA;
            position: static;
            background: none;
        }

        .file-list {
            font-size: 14px;
            line-height: 16px;
            text-align: center;
            color: #9898AA;
            margin: 0;
            padding: 0;
            list-style-type: none;
        }
    }
</style>

<style lang="scss">
    // select

    .v-select {
        height: 56px;

        .vs__dropdown-toggle {
            height: 100%;
            border-radius: 0;
        }

        .vs__selected {
            background-color: #fff !important;
            z-index: 2;
            height: 100%;
            width: 100%;
            opacity: 1 !important;
        }

    }

    // datapicker

    .input-container {
        .mx-datepicker {
            width: 100%;
            height: 56px;
        }

        .mx-input-wrapper {
            height: 100%;
        }

        .mx-input {
            height: 100%;
            border: 1.5px solid #9898AA;
            background: #FFFFFF;
            padding-left: 24px;
            padding-right: 24px;
            padding-top: 16px;
            padding-bottom: 16px;
            border-radius: 2px;
            cursor: pointer;
            font-size: 18px;
            line-height: 24px;
            color: #222;

            &:focus,
            &:hover {
                border: 1.5px solid #000000;
                outline: none;
            }
        }

        .mx-icon-calendar {
            right: 16px;
        }
    }
</style>