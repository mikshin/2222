<template>
    <form class="form-wrapper" @submit="checkForm">
        <form-template 
        v-for="formItem in form"
        :key="formItem.id" 
        :formItem='formItem' />
        <div class="button-wrapper">
            <!-- <router-link to="/direction"> -->
                <button-template class="button-primary" :type="'submit'" :text="'Перейти к выбору направления'" :disabled="isDisabled" />
            <!-- </router-link> -->
        </div>
    </form>
</template>
<script>
    import {
        mapActions,
        mapGetters
    } from 'vuex'
    import formTemplate from './form'
    import buttonTemplate from '../../ui/buttonTemplate'

    export default {
        data() {
            return {
                isDisabled: false
            }
        },
        components: {
            formTemplate,
            buttonTemplate,
        },
        methods: {
            ...mapActions(['fetchForm']),
            checkForm: function(e) {
                // console.log(this)

                e.preventDefault();
            }
        },
        computed: mapGetters(['form']),
        async mounted() {
            this.fetchForm()
        }
    }
</script>
