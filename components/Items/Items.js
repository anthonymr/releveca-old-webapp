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
            <v_pagination @change="getItems" request="getItemsCount"></v_pagination>
            <div class="items__container">
                <v_item @refresh="getItems(0, 10)" v-for="item in items" :item="item" :large="largeIcons" :key="item.id" ></v_item>
            </div>
            <v_pagination @change="getItems" request="getItemsCount"></v_pagination>
        </section>
    `,

    data() {
        return {
            items: [],
            largeIcons: true,
        }
    },

    created() {
        this.getItems(0, 10);
    },

    methods: {
        getItems(from, display) {
            axios.post(this.$ajax, { request: 'getItems', from, display })
                .then((response) => { this.items = response.data; })
                .catch((error) => console.error(error));
        },
    },
});