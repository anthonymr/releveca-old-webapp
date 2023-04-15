Vue.component('v_client_files', {
  props: ['client'],

  template: `
      <div>
          <i class="fa-solid fa-file-arrow-up"
            @click="showModal = true">
          </i>
          <span>Docs.</span>

          <v_modal 
              v-if="showModal"
              @close="showModal = false"
              >
              <span slot="title">{{client.name.toLowerCase()}}</span>
              <div slot="body">
                  <v_client_files_form :client="client" @files-updated="updated++" />
                  <v_client_files_list :key="updated" :client="client" />
              </div>
              <template slot="buttons">
              </template>
          </v_modal>
      </div>
  `,

  data() {
    return {
      showModal: false,
      updated: 0,
    }
  },

  methods: {
  },
});