Vue.component('v_client_files_list', {
  props: ['client'],

  template: `
      <div>
        <h4>Documentos del cliente:</h4>
        <div v-if="noFiles">
          <h5>Este cliente aún no contiene documentos.</h5>
        </div>
        
        <div v-if="files.length > 0" class="file-list">
          <div v-for="file in files" class="file">
            <div class="file-extension">
              <i :class="documentTypeTpFAIcon(file.extension)"></i>
            </div>
            <div class="file-type">{{ file.type }}</div>
            <a class="icon-button url-button" download :href="'assets/files/clients/' + file.id + '.' + file.extension">
              <i class="fa-solid fa-file-download"></i>
            </a>
          </div>
        </div>
        
      </div>
  `,

  data() {
    return {
      files: [],
      noFiles: false,
    }
  },

  created() {
    this.getClientFiles();
  },

  methods: {
    getClientFiles() {
      axios.post(this.$ajax, { request: 'getClientFiles', id: this.client.id })
      .then(response => {
        this.files = response.data
        console.log(response.data);

        if (this.files.length == 0) {
          this.noFiles = true;
        }
      })
      .catch(error => console.error(error));
    }
  },
});