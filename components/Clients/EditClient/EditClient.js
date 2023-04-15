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
                        <select :disabled="cantEdit" class="form-rif-type" v-model="inputs.rifType.value" :class="{'error': !inputs.rifType.valid}">
                          <option>J</option>
                          <option>V</option>
                          <option>G</option>
                          <option>P</option>
                        </select>
                        <input :disabled="cantEdit" type="text" placeholder="XXXXXXXX-X" maxlength="13" v-model="inputs.rif.value"  :class="{'error': !inputs.rif.valid}">
                      </div>
                    </div>

                    <div class="form-line">
                      <label class="required">Razón social</label>
                      <div>
                        <input :disabled="cantEdit" type="text" maxlength="150" v-model="inputs.bussinessName.value" :class="{'error': !inputs.bussinessName.valid}">
                      </div>
                    </div>

                    <div class="form-line">
                      <label class="required">Dirección fiscal</label>
                      <div>
                        <textarea maxlength="190" v-model="inputs.address.value" :class="{'error': !inputs.address.valid}"></textarea>
                      </div>
                    </div>

                    <div class="form-line">
                      <label class="required">Teléfono</label>
                      <div>
                        <input type="text" class="form-phone-code" maxlength="4" placeholder="02XX" v-model="inputs.phoneCode.value" :class="{'error': !inputs.phoneCode.valid}"/>
                        <input type="text" placeholder="XXXXXXX" maxlength="10" v-model="inputs.phone.value" :class="{'error': !inputs.phone.valid}">
                      </div>
                    </div>

                    <div class="form-line">
                      <label>Notas</label>
                      <div>
                        <textarea maxlength="200" v-model="inputs.notes.value"></textarea>
                      </div>
                    </div>

                    <div class="form-line">
                      <label>Impuesto</label>
                      <div>
                        <input v-model="inputs.tax.value" type="checkbox">
                      </div>
                    </div>

                    <div class="form-line">
                      <label class="required">Correo</label>
                      <div>
                        <input v-model="inputs.email.value" type="email" :class="{'error': !inputs.email.valid}">
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

      inputs: {
        rifType: {
          value: '',
          valid: true,
          name: 'Tipo de RIF',
        },
        rif: {
          value: '',
          valid: true,
          name: 'RIF',
          minLength: 7,
          maxLength: 13,
          noWhiteSpaces: true,
        },
        bussinessName: {
          value: '',
          valid: true,
          name: 'Razón social',
          minLength: 10,
          maxLength: 150,
        },
        address: {
          value: '',
          valid: true,
          name: 'Dirección fiscal',
          minLength: 20,
          maxLength: 190,
        },
        phoneCode: {
          value: '',
          valid: true,
          name: 'Código de área',
          length: 4,
          noWhiteSpaces: true,
        },
        phone: {
          value: '',
          valid: true,
          name: 'Teléfono',
          length: 7,
          noWhiteSpaces: true,
        },
        notes: {
          value: '',
          valid: true,
          name: 'Notas',
          notRequired: true,
          maxLength: 200,
        },
        email: {
          value: '',
          valid: true,
          name: 'Correo',
          regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          maxLength: 100,
          noWhiteSpaces: true,
        },
        tax: {
          value: false,
          valid: true,
          name: 'Impuesto',
          notRequired: true,
        },
      },
    }
  },

  watch: {
    showModal: function (val) {
      if (val === true) {
        console.log("montado")
        const rifType = this.client.rif[0].toUpperCase();
        if (rifType === 'J' || rifType === 'G' || rifType === 'V' || rifType === 'P') {
          this.inputs.rifType.value = rifType;
          this.inputs.rif.value = this.client.rif.replaceAll('-', '').slice(1);
        } else {
          this.inputs.rif.value = this.client.rif.replaceAll('-', '');
        }
        this.inputs.bussinessName.value = this.client.name;
        this.inputs.address.value = this.client.address;

        if (this.client.phone.split('-')[0].length === 4) {
          this.inputs.phoneCode.value = this.client.phone.split('-')[0];
          this.inputs.phone.value = this.client.phone.split('-')[1];
        }

        this.inputs.notes.value = this.client.notes;
        this.inputs.email.value = this.client.email;
        this.inputs.tax.value = Number(this.client.taxpayer);
      }
    }
  },

  methods: {
    async editClient(e) {
      e.preventDefault();
      if (!this.validateForm(this.inputs)) return;

      if (await this.checkIfRIFExistsInOthers(this.inputs.rif.value)) return;

      this.setNewClientData();
    },

    setNewClientData() {
      const newClientData = {
        code: this.inputs.rifType.value + this.inputs.rif.value,
        bussinessName: this.inputs.bussinessName.value,
        address: this.inputs.address.value,
        phone: `${this.inputs.phoneCode.value}-${this.inputs.phone.value}`,
        notes: this.inputs.notes.value,
        email: this.inputs.email.value,
        tax: this.inputs.tax.value ? 1 : 0,
      }

      axios.post(this.$ajax, { request: 'updateClient', newClientData, client_id: this.client.id })
        .then(response => {
          if (response.data === 200) {
            this.$alerts.push({ message: `El cliente ${newClientData.bussinessName} ha sido actualizado`, type: 'ok' });
            this.clearFormFields(this.inputs);
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