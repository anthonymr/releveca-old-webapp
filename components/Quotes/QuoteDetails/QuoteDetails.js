Vue.component('v_quote_details', {
  props: ['quote'],
  
  template: `
      <div class="item__icon">
          <i 
              class="fa-solid fa-eye fa-fw"
              @click="showModal = true"
              ></i>
          <v_modal 
              v-if="showModal"
              @close="showModal = false"
              >
              <span slot="title">{{capitalize(quote.name)}}</span>
              <div slot="body">
                <div class="quote-flex">
                    <div class="quote-line">
                        <label>ID:</label>
                        <span>1</span>
                    </div>
                    <div class="quote-line">
                        <label>ID en el sistema:</label>
                        <span>2</span>
                    </div>
                    <div class="quote-line">
                        <label>Forma de pago:</label>
                        <span>contado</span>
                    </div>
                </div>
                <div class="quote__details">
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
                                    {{toFixed(quote.sub_total)}} {{quote.currency}}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">IVA:</td>
                                <td>
                                    {{toFixed(quote.taxes)}} {{quote.currency}}
                                </td>
                            </tr>
                            <tr>
                                <td colspan="3">Total:</td>
                                <td>
                                    {{toFixed(quote.total)}} {{quote.currency}}
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
    this.getQuoteDetails();
  },

  methods: {
    getQuoteDetails() {
        axios.post(this.$ajax, { request: 'getQuoteDetails', id: this.quote.quote_id })
        .then((response) => this.details = response.data)
        .catch((e) => console.error(e));
    },
  },
});