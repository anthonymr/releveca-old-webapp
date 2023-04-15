Vue.component('v_items', {
    template: `
        <section class="list">
            <div class="list-display">
                <input 
                    type="search" 
                    placeholder="buscar" 
                    v-model="filter" 
                    @keyup.enter="changeFilter"
                >
                <span v-if="largeIcons" @click="largeIcons = false">
                    <i class="fa-solid fa-table-list"></i>
                </span>
                <span v-else @click="largeIcons = true">
                    <i class="fa-solid fa-table-cells-large"></i>
                </span>
            </div>
            <v_pagination @change="getItems" request="getItemsCount" :filter="paginationFilter">
                <div slot="list" class="list__container">
                    <v_item 
                        @refresh="getItems(0, 10)" 
                        v-for="item in items" :item="item" 
                        :large="largeIcons" 
                        :key="item.id" 
                    >
                    </v_item>

                    <div v-if="!items.length">
                        No se ha encontrado ningún artículo.
                    </div>
                </div>
            </v_pagination>
        </section>
    `,

    data() {
        return {
            items: [],
            largeIcons: true,
            filter: '',
            paginationFilter: '',
        }
    },

    created() {
        this.getItems(0, 10);
    },

    methods: {
        changeFilter(){
            this.getItems(0, 10, this.filter);
            this.paginationFilter = this.filter;
        },
        getItems(from, display, filter='') {
            axios.post(this.$ajax, { request: 'getItems', from, display, filter })
                .then((response) => { 
                    this.items = response.data;
                    this.scrollTo('start');
                })
                .catch((error) => console.error(error));
        },
    },
});