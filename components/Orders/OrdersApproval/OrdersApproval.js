Vue.component('v_orders_approval', {
    template: `
      <section class="list" id="start">
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

          <v_pagination @change="getOrders" request="getOrdersForApprovalCount" :filter="paginationFilter">
              <div slot="list" class="list__container">
                  <v_order 
                      @refresh="getOrders(0, 10)" 
                      v-for="order in orders" :order="order" 
                      :large="largeIcons" 
                      :key="order.order_id"
                      :approve="approveOrder"
                  >
                  </v_order>

                  <div v-if="!orders.length">
                      No se ha encontrado ninguna proforma.
                  </div>
              </div>
          </v_pagination>
      </section>
  `,

    data() {
        return {
            orders: [],
            largeIcons: true,
            filter: '',
            paginationFilter: '',
        }
    },

    created() {
        this.getOrders(0, 10);
    },

    methods: {
        approveOrder(order) {
            axios.post(this.$ajax, { request: 'approveOrder', id: order.order_id })
                .then(() => this.getOrders(0, 10, this.filter))
                .catch((error) => console.error(error));
        },
        changeFilter() {
            this.getOrders(0, 10, this.filter);
            this.paginationFilter = this.filter;
        },
        getOrders(from, display, filter = '') {
            axios.post(this.$ajax, { request: 'getOrdersForApproval', from, display, filter })
                .then((response) => {
                    this.orders = response.data;
                    this.scrollTo('start');
                })
                .catch((error) => console.error(error));
        },
    },
});