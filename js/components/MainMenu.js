Vue.component('v_main_menu', {

    template: `
        <section>
            test
        </section>
    `,

    data() {
        return {
            modules: [],
        }
    },

    created() {
        console.log(this.$ajax);
    },

    methods: {
        getModules(){
            axios.post(this.ajax, { request: 24, item_id: this.article.id, template_id: this.article.template })
            .then((response) => {this.details = response.data;})
            .catch((error) => console.error(error));
        },
    },
});