Vue.component('v_client_files_form', {
  props: ['client'],

  template: `
      <div class="form-container">
          <form @submit.prevent="submit">
            <div class="form-line">
              <label for="fileType">File Type</label>
              <div>
                <select id="fileType" class="form-control" v-model="fileType">
                  <option v-for="type in fileTypes" :value="type">
                    {{ type }}
                  </option>
                </select>
                <label class="custom-file-upload" :class="{'file-loaded': files.length}">
                  <input type="file" multiple="multiple" @change="fileChange"/>
                  <i class="fa-solid fa-file-arrow-up"></i>
                </label>
                <button @click="addNewFile" class="icon-button">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
            </div>

            <div class="new-files-container">
              <div class="new-file" v-for="(file, index) in newFiles">
                <div class="file-extension">
                  <i :class="documentTypeTpFAIcon(file.fileExtension)"></i>
                </div>
                <div class="file-type">{{ file.fileType }}</div>
                <button class="icon-button" @click="deleteFile(index)">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
            </div>
          </form>


      </div>
  `,

  data() {
    return {
      fileType: '',
      files: [],
      fileTypes: [
        'Acta constitutiva',
        'Factura de compra',
        'Cedula de identidad',
        'RIF',
        'Foto del establecimiento',
        'Otro'
      ],
      newFiles: []
    }
  },

  methods: {
    fileChange(e) {
      this.files = Array.from(e.target.files);
    },
    submit() {
      console.log(this.fileType);
    },
    async addNewFile() {
      if(!this.fileType) {
        this.$alerts.push({ message: `Seleccion un tipo de archivo`, type: 'alert' });
        return;
      }

      if(!this.files.length) {
        this.$alerts.push({ message: `Seleccione al menos un archivo`, type: 'alert' });
        return;
      }

      this.files.forEach(async file => {
        const fileExtension = file.name.split('.').pop();

        this.newFiles.push({
          fileType: this.fileType,
          file: await this.toBase64Async(file),
          fileExtension,
        });
      });

      this.fileType = '';
      this.file = [];
    },
    deleteFile(index) {
      this.newFiles.splice(index, 1);
    }
  },

});