<template>
    <form :id="formItem.id" class="form" @submit="saveForm" novalidate>
        <h1>{{ formItem.name }}</h1>

        <fieldset class="form-fieldset">
            <input-template v-for="input in formItem.children" :key="input.id" :type="input.fieldType"
                :placeholder="input.name" :radioValue="input.radioValue" :name="input.fieldName" :newClass="input.class"
                :info="input.info" :required="input.required" :selectOptions="input.selectOptions" :errors="''"
                :onInput="onInput" />
        </fieldset>

        <div class="button-wrapper">
            <button-template class="button-primary" :type="'submit'" :text="'Сохранить'" />
        </div>
    </form>
</template>

<script>
    import InputTemplate from '../../ui/inputTemplate.vue'
    import ButtonTemplate from '../../ui/buttonTemplate'

    export default {
        props: {
            formItem: null
        },
        components: {
            InputTemplate,
            ButtonTemplate
        },
        methods: {
            onInput(data) {
            },
            saveForm: function (e) {                 
                for(let i=0; i < this.$children.length -1 ; i++) {
                    // console.log(this.$children[i].name +' : '+ localStorage.getItem(this.$children[i].name))
                } 
                e.preventDefault();
            }

        }
    }
</script>

<style lang="scss" scoped>
    .form-fieldset {
        border: none;
        display: flex;
        flex-wrap: wrap;
        margin: 0;
        padding: 0;
        width: 100%;
        max-width: 632px;
    }

    .form {
        background-color: #fff;
        padding: 32px;
        padding-right: 16px;
        margin-bottom: 32px;
        width: 80%;
        .button.button-primary {
            background-color: #006147;
        }
    }

    .input-container {
        margin-right: 16px;
    }

    .form-wrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
</style>