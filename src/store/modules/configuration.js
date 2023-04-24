export default {
    actions: {
        async fetchForm(ctx) {
            const res = await fetch("http://localhost:3000/configuration")
            // const res = await fetch("./db.json")
            const formData = await res.json()

            ctx.commit('updateForm', formData)
        }
    },
    mutations: {
        updateForm(state,formData) {
            state.form = formData
        }
    },
    state: {
        form: []
    },
    getters: {
        form(state) {
            return state.form
        }
    }
}