Vue.component('v_order_details', {
    props: ['order'],

    template: `
      <div @click.self="showModal = true">
        <i @click.self="showModal = true" class="fa-solid fa-eye"></i>
        <span @click.self="showModal = true">Ver</span>
          <v_modal 
              v-if="showModal"
              @close="showModal = false"
              >
              <span slot="title">{{capitalize(order.name)}}</span>
              <div slot="body">
                <div class="order-flex">
                    <div class="order-line">
                        <label>ID:</label>
                        <span>1</span>
                    </div>
                    <div class="order-line">
                        <label>ID en el sistema:</label>
                        <span>2</span>
                    </div>
                    <div class="order-line">
                        <label>Forma de pago:</label>
                        <span>contado</span>
                    </div>
                </div>
                <div class="order__details">
                    <table>
                        <thead>
                            <tr>
                                <th style="width:30px">Cant.</th>
                                <th style="width:calc(100% - 180px)">Artículo</th>
                                <th style="width:75px">Unid.</th>
                                <th style="width:75px">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="detail in details">
                                <td class="right">{{detail.qty}}</td>
                                <td class="left">{{capitalize(detail.name)}}</td>
                                <td class="right">{{toFixed(detail.unit_price)}} {{detail.currency}}</td>
                                <td class="right">{{toFixed(detail.total_price)}} {{detail.currency}}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3">Subtotal:</td>
                                <td>
                                    {{toFixed(order.sub_total)}} {{order.currency}}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">IVA:</td>
                                <td>
                                    {{toFixed(order.taxes)}} {{order.currency}}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">Total:</td>
                                <td>
                                    {{toFixed(order.total)}} {{order.currency}}
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
              </div>
              <template slot="buttons">
              </template>
          </v_modal>
      </div>
  `,

    data() {
        return {
            showModal: false,
            details: [],
        }
    },

    created() {
        this.getOrderDetails();
    },

    methods: {
        getOrderDetails() {
            axios.post(this.$ajax, { request: 'getOrderDetails', id: this.order.order_id })
                .then((response) => this.details = response.data)
                .catch((e) => console.error(e));
        },
    },
});