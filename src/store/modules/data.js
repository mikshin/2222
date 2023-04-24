// export default {
//     actions: {
//         async fetchForm(ctx) {
//             const res = await fetch("http://localhost:3000/form")
//             // const res = await fetch("./db.json")
//             const formData = await res.json()

//             ctx.commit('updateForm', formData)
//         }
//     },
//     mutations: {
//         updateForm(state,formData) {
//             state.form = formData
//         }
//     },
//     state: {
//         data: []
//     },
//     getters: {
//         data(state) {
//             return state.data
//         }
//     }
// }