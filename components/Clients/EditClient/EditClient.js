Vue.component('v_edit_client', {
  props: ['client'],

  template: `
      <div>
          <i class="fas fa-edit"
            @click="showModal = true">
          </i>
          <span>Editar</span>

          <v_modal 
              v-if="showModal"
              @close="showModal = false"
              >
              <span slot="title">Editando: {{client.name.toLowerCase()}}</span>
              <div slot="body">
                <div class="form-container">
                  <form>
                    <h3>Crear nuevo cliente</h3>

                    <div class="form-line">
                      <label class="required">RIF</label>
                      <div>
                        <select :disabled="cantEdit" class="form-rif-type" v-model="$root.clientInputs.rifType.value" :class="{'error': !$root.clientInputs.rifType.valid}">
                          <option>J</option>
                          <option>V</option>
                          <option>G</option>
                          <option>P</option>
                        </select>
                        <input :disabled="cantEdit" type="text" placeholder="XXXXXXXX-X" maxlength="13" v-model="$root.clientInputs.rif.value"  :class="{'error': !$root.clientInputs.rif.valid}">
                      </div>
                    </div>

                    <div class="form-line">
                      <label class="required">Razón social</label>
                      <div>
                        <input :disabled="cantEdit" type="text" maxlength="150" v-model="$root.clientInputs.bussinessName.value" :class="{'error': !$root.clientInputs.bussinessName.valid}">
                      </div>
                    </div>

                    <div class="form-line">
                      <label class="required">Dirección fiscal</label>
                      <div>
                        <textarea maxlength="190" v-model="$root.clientInputs.address.value" :class="{'error': !$root.clientInputs.address.valid}"></textarea>
                      </div>
                    </div>

                    <div class="form-line">
                      <label class="required">Teléfono</label>
                      <div>
                        <input type="text" class="form-phone-code" maxlength="4" placeholder="02XX" v-model="$root.clientInputs.phoneCode.value" :class="{'error': !$root.clientInputs.phoneCode.valid}"/>
                        <input type="text" placeholder="XXXXXXX" maxlength="10" v-model="$root.clientInputs.phone.value" :class="{'error': !$root.clientInputs.phone.valid}">
                      </div>
                    </div>

                    <div class="form-line">
                      <label>Notas</label>
                      <div>
                        <textarea maxlength="200" v-model="$root.clientInputs.notes.value"></textarea>
                      </div>
                    </div>

                    <div class="form-line">
                      <label>Impuesto</label>
                      <div>
                        <input v-model="$root.clientInputs.tax.value" type="checkbox">
                      </div>
                    </div>

                    <div class="form-line">
                      <label class="required">Correo</label>
                      <div>
                        <input v-model="$root.clientInputs.email.value" type="email" :class="{'error': !$root.clientInputs.email.valid}">
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <template slot="buttons">
                <button @click="editClient">
                  <i class="fas fa-save"></i>
                  Editar cliente
                </button>
              </template>
          </v_modal>
      </div>
  `,

  data() {
    return {
      showModal: false,
    }
  },

  created() {
    this.clearFormFields(this.$root.clientInputs);
  },

  destroyed() {
    this.clearFormFields(this.$root.clientInputs);
  },

  watch: {
    showModal: function (val) {
      if (val === true) {
        console.log("montado")
        const rifType = this.client.rif[0].toUpperCase();
        if (rifType === 'J' || rifType === 'G' || rifType === 'V' || rifType === 'P') {
          this.$root.clientInputs.rifType.value = rifType;
          this.$root.clientInputs.rif.value = this.client.rif.replaceAll('-', '').slice(1);
        } else {
          this.$root.clientInputs.rif.value = this.client.rif.replaceAll('-', '');
        }
        this.$root.clientInputs.bussinessName.value = this.client.name;
        this.$root.clientInputs.address.value = this.client.address;

        if (this.client.phone.split('-')[0].length === 4) {
          this.$root.clientInputs.phoneCode.value = this.client.phone.split('-')[0];
          this.$root.clientInputs.phone.value = this.client.phone.split('-')[1];
        }

        this.$root.clientInputs.notes.value = this.client.notes;
        this.$root.clientInputs.email.value = this.client.email;
        this.$root.clientInputs.tax.value = Number(this.client.taxpayer);
      }
    }
  },

  methods: {
    async editClient(e) {
      e.preventDefault();
      if (!this.validateForm(this.$root.clientInputs)) return;

      if (await this.checkIfRIFExistsInOthers(this.$root.clientInputs.rif.value)) return;

      this.setNewClientData();
    },

    setNewClientData() {
      const newClientData = {
        code: this.$root.clientInputs.rifType.value + this.$root.clientInputs.rif.value,
        bussinessName: this.$root.clientInputs.bussinessName.value,
        address: this.$root.clientInputs.address.value,
        phone: `${this.$root.clientInputs.phoneCode.value}-${this.$root.clientInputs.phone.value}`,
        notes: this.$root.clientInputs.notes.value,
        email: this.$root.clientInputs.email.value,
        tax: this.$root.clientInputs.tax.value ? 1 : 0,
      }

      axios.post(this.$ajax, { request: 'updateClient', newClientData, client_id: this.client.id })
        .then(response => {
          if (response.data === 200) {
            this.$alerts.push({ message: `El cliente ${newClientData.bussinessName} ha sido actualizado`, type: 'ok' });
            this.clearFormFields(this.$root.clientInputs);
            this.$emit('updated');
            document.body.classList.remove("modal-open");
            this.showModal = false;
          } else {
            this.$alerts.push({ message: `Error inesperado editando el cliente`, type: 'alert' });
            console.error(response.data);
          }
        })
        .catch((error) => {
          this.$alerts.push({ message: `Error inesperado editando el cliente`, type: 'alert' });
          console.error(error);
        });
    },

    async checkIfRIFExistsInOthers(rif) {
      const response = await axios.post(this.$ajax, { request: 'checkIfRIFExistsInOthers', rif, client_id: this.client.id })
      if (response.data.length) {
        const client = response.data[0].name.trim();
        this.$alerts.push({ message: `El RIF ${rif} ya existe en la base de datos para el cliente ${client}`, type: 'alert' });
        return true;
      }
      return false;
    }
  },

  computed: {
    cantEdit() {
      return this.client.status === 'aprobado';
    }
  }
});