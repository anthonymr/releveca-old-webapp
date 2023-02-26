Vue.component('v_items', {
    template: `
        <section class="items">
            {{items}}
        </section>
    `,

    data() {
        return {
            items: [],
        }
    },

    created() {
        this.getItems();
    },

    methods: {
        getItems() {
            axios.post(this.$ajax, { request: 'getItems' })
                .then((response) => { this.items = response.data; })
                .catch((error) => console.error(error));
        }
    },
});