<template>
    <main>
        <section class="form-stages">
            <router-link class="stages-link" to='/configuration'>Анкет12ё3123а</router-link>
            <router-link class="stages-link" to='/direction'>Выбор направления</router-link>
            <router-link class="stages-link" to='/USE'>Результаты ЕГЭ</router-link>
            <router-link class="stages-link" to='/profile'>Профиль</router-link>
        </section>
        <section class="form-form">
            <router-view></router-view>
        </section>
    </main>
</template>
<script>

</script>
<style lang="scss" scoped>
    main {
        display: flex;
        section {
            flex: 1;
            max-width: 1400px;
        }
    }

    .form-stages {
        display: flex;
        flex-direction: column;
        max-width: 200px;
    }

    .form-form {
    }

    .stages-link {
        color: #fff;
        &.router-link-exact-active {
            color: tomato;
            &~.stages-link {
                color: blue
            }
        }
    }
</style>