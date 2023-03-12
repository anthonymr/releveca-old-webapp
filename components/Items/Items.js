Vue.component('v_items', {
    template: `
        <section class="items">
            <div class="items-display">
                <input type="text" placeholder="buscar">
                <span v-if="largeIcons" @click="largeIcons = false">
                    <i class="fa-solid fa-table-list"></i>
                </span>
                <span v-else @click="largeIcons = true">
                    <i class="fa-solid fa-table-cells-large"></i>
                </span>
            </div>
            <div class="items__container">
                <v_item v-for="item in items" :item="item" :large="largeIcons" ></v_item>
            </div>
        </section>
    `,

    data() {
        return {
            items: [],
            largeIcons: true,
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