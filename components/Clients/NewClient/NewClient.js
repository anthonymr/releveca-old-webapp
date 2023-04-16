Vue.component('v_new_client', {
  template: `
      <section>
        <div class="form-container">
          <form>
            <div class="form-line">
              <label class="required">RIF</label>
              <div>
                <select class="form-rif-type" v-model="$root.clientInputs.rifType.value" :class="{'error': !$root.clientInputs.rifType.valid}">
                  <option>J</option>
                  <option>V</option>
                  <option>G</option>
                  <option>P</option>
                </select>
                <input type="text" placeholder="XXXXXXXX-X" maxlength="13" v-model="$root.clientInputs.rif.value"  :class="{'error': !$root.clientInputs.rif.valid}">
              </div>
            </div>

            <div class="form-line">
              <label class="required">Razón social</label>
              <div>
                <input type="text" maxlength="150" v-model="$root.clientInputs.bussinessName.value" :class="{'error': !$root.clientInputs.bussinessName.valid}">
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

            <div class="form-line">
              <button @click="createClient">
                <i class="fas fa-save"></i>
                Crear cliente
              </button>
            </div>
          </form>
        </div>
      </section>
  `,

  data() {
    return {}
  },

  created() {
    this.clearFormFields(this.$root.clientInputs);
  },

  beforeDestroy() {
    this.clearFormFields(this.$root.clientInputs);
  },

  methods: {
    async createClient(e) {
      e.preventDefault();
      if (!this.validateForm(this.$root.clientInputs)) return;

      if(await this.checkIfRIFExists(this.$root.clientInputs.rif.value)) return;

      this.setNewClient();
    },

    setNewClient() {
      const newClient = {
        code: this.$root.clientInputs.rifType.value + this.$root.clientInputs.rif.value, 
        bussinessName: this.$root.clientInputs.bussinessName.value,
        address: this.$root.clientInputs.address.value,
        phone: `${this.$root.clientInputs.phoneCode.value}-${this.$root.clientInputs.phone.value}`,
        notes: this.$root.clientInputs.notes.value,
        email: this.$root.clientInputs.email.value,
        tax: this.$root.clientInputs.tax.value ? 1 : 0,
      }

      axios.post(this.$ajax, { request: 'createClient', newClient })
        .then(response => {
          if (response.data === 200) {
            this.$alerts.push({ message: `El cliente ${newClient.bussinessName} ha sido creado`, type: 'ok' });
            this.clearFormFields(this.$root.clientInputs);
          } else {
            this.$alerts.push({ message: `Error inesperado creando el cliente`, type: 'alert' });
          }
        })
        .catch((error) => {
          this.$alerts.push({ message: `Error inesperado creando el cliente`, type: 'alert' });
          console.error(error);
        });      
    },

    async checkIfRIFExists(rif) {
      const response = await axios.post(this.$ajax, { request:'checkIfRIFExists', rif })
      if (response.data.length) {
        const client = response.data[0].name.trim();
        this.$alerts.push({ message: `El RIF ${rif} ya existe en la base de datos para el cliente ${client}`, type: 'alert' });
        return true;
      }
      return false;
    }
  },
});