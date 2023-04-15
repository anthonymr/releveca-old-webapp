Vue.component('v_reassign_client', {
  props: ['client'],

  template: `
      <div>
          <i class="fa-solid fa-user-tag"
            @click="showModal = true">
          </i>
          <span>Reasig.</span>

          <v_modal 
              v-if="showModal"
              @close="showModal = false"
              >
              <span slot="title">Reasignar a {{client.name.toLowerCase()}}</span>
              <div slot="body">
                <v-select 
                  :options="users"
                  placeholder="Nuevo dueño"
                  label="username"
                  v-model="selectedNewOwner"
                  :clearable="false"
                >
                </v-select>
                <button class="margin-top" @click="reassignClient">Reasignar</button>
              </div>
              <template slot="buttons">
              </template>
          </v_modal>
      </div>
  `,

  data() {
    return {
      showModal: false,
      users: [],
      selectedNewOwner: null,
    }
  },

  created() {
    this.getUsers();
  },

  methods: {
    reassignClient() {
      axios.post(this.$ajax, { request: 'reassignClient', client_id: this.client.id, new_owner: this.selectedNewOwner.id })
        .then(() => {
          this.showModal = false;
          this.$emit('updated');
        })  
        .catch((error) => console.error(error));
    },

    getUsers() {
      axios.post(this.$ajax, { request: 'getUsers' })
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
});