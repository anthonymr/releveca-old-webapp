Vue.component('v_items', {
    template: `
        <section class="items">
            <div class="items-display">
                <input type="text" placeholder="buscar">
                <span><i class="fa-solid fa-table-cells-large"></i></span>
                <span><i class="fa-solid fa-table-list"></i></span>
                <span><i class="fa-solid fa-file-pdf"></i></span>
            </div>
            <div class="items__container">
                <v_item v-for="item in items" :item="item"></v_item>
            </div>
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