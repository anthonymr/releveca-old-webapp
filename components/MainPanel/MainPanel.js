Vue.component('v_main_panel', {
    props: ['module'],

    template: `
        <section>
           {{module.name}}
           {{submodules}}
        </section>
    `,

    data() {
        return {
            submodules: [],
        }
    },

    created() {
        this.getSubmodules();
    },

    methods: {
        getSubmodules() {
            axios.post(this.$ajax, { request: 'getSubmodules', module: this.module.id })
                .then((response) => { this.submodules = response.data; })
                .catch((error) => console.error(error));
        },
    },
});