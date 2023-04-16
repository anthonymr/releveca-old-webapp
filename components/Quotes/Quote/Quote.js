Vue.component('v_quote', {
  props: ['quote', 'large', 'approve'],
  template: `
      <article class="card quote">
        <div class="card__main_container">
          <div class="flex-container quote__container">
            <div class="quote__id">
              {{id}}
            </div>
            <div class="quote__description">
              {{capitalize(quote.name)}}
            </div>
            <div class="quote__price">
              {{quoteTotal(quote)}}
            </div>
            <div class="quote__status">
              <span :class="'label ' + statusColor">
                {{status}}
              </span>
            </div>
            <div class="quote__button">
              <v_quote_details :quote="quote"></v_quote_details>
            </div>
            <div class="quote__button" v-if="approve">
              <div class="item__icon" @click="approve(quote)" v-if="quote.approved === '0'">
                <i class="fa-solid fa-circle-check"></i>
              </div>
            </div>
          </div>
        </div>
      </article>
  `,

  data() {
    return {
    }
  },

  methods: {
    quoteTotal(quote) {
      const total = parseFloat(quote.total).toFixed(2)
      return `${total} ${quote.currency}`;
    }
  },

  computed: {
    status() {
      if(this.quote.status === 'en espera' && this.quote.approved === '1' && this.approve) {
        return 'sistema';
      }

      return this.quote.status;
    },
    statusColor() {
      if(this.status === 'sistema') return('warning');
      if(this.status === 'en espera') return('default');
      if(this.status === 'por cobrar') return('danger');
      if(this.status === 'pagado') return('ok');
    },
    id() {
      return this.quote.quote_index || this.quote.quote_id;
    }
  }
});