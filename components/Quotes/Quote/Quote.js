Vue.component('v_quote', {
  props: ['quote', 'large'],
  template: `
      <article class="card">
        <div class="card__main_container">
          <div class="flex-container quote__container">
            <div class="quote__id">
              {{quote.quote_id}}
            </div>
            <div class="quote__description">
              {{capitalize(quote.name)}}
            </div>
            <div class="quote__price">
              {{quoteTotal(quote)}}
            </div>
            <div class="quote__status">
              <span>
                {{quote.status}}
              </span>
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
});