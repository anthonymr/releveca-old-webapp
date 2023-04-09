Vue.component('v_quotes', {
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

          <v_pagination @change="getQuotes" request="getQuotesCount" :filter="paginationFilter">
              <div slot="list" class="list__container">
                  <v_quote 
                      @refresh="getQuotes(0, 10)" 
                      v-for="quote in quotes" :quote="quote" 
                      :large="largeIcons" 
                      :key="quote.quote_id" 
                  >
                  </v_quote>

                  <div v-if="!quotes.length">
                      No se ha encontrado ninguna proforma.
                  </div>
              </div>
          </v_pagination>
      </section>
  `,

  data() {
      return {
          quotes: [],
          largeIcons: true,
          filter: '',
          paginationFilter: '',
      }
  },

  created() {
      this.getQuotes(0, 10);
  },

  methods: {
      changeFilter(){
          this.getQuotes(0, 10, this.filter);
          this.paginationFilter = this.filter;
      },
      getQuotes(from, display, filter='') {
          axios.post(this.$ajax, { request: 'getQuotes', from, display, filter })
              .then((response) => { 
                  this.quotes = response.data;
                  this.scrollTo('start');
              })
              .catch((error) => console.error(error));
      },
  },
});