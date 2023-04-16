Vue.component('v_clients', {
    props: ['all'],
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
          <v_pagination @change="getClients" :request="paginationCount" :filter="paginationFilter">
              <div slot="list" class="list__container">
                  <v_client 
                      @refresh="getClients(0, 10)" 
                      v-for="client in clients" :client="client" 
                      :large="largeIcons" 
                      :key="client.id" 
                      :admin="all"
                  >
                  </v_client>

                  <div v-if="!clients.length">
                      No se ha encontrado ningún cliente.
                  </div>
              </div>
          </v_pagination>
      </section>
  `,

  data() {
      return {
          clients: [],
          largeIcons: true,
          filter: '',
          paginationFilter: '',
      }
  },

  created() {
      this.getClients(0, 10);
  },

  methods: {
      changeFilter(){
          this.getClients(0, 10, this.filter);
          this.paginationFilter = this.filter;
      },
      getClients(from, display, filter='') {
          const request = this.all ? 'getAllClients' : 'getClients';
          axios.post(this.$ajax, { request, from, display, filter })
              .then((response) => { 
                  this.clients = response.data;
                  this.scrollTo('start');
              })
              .catch((error) => console.error(error));
      },
  },

  computed: {
    paginationCount() {
        return this.all ? 'getAllClientsCount' : 'getClientsCount';
    }
  }
});