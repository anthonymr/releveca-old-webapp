Vue.component('v_new_client', {
  template: `
      <section>
        <div class="form-container">
          <form>
            <h3>Crear nuevo cliente</h3>

            <div class="form-line">
              <label class="required">RIF</label>
              <div>
                <select class="form-rif-type" v-model="inputs.rifType.value" :class="{'error': !inputs.rifType.valid}">
                  <option>J</option>
                  <option>V</option>
                  <option>G</option>
                  <option>P</option>
                </select>
                <input type="text" placeholder="XXXXXXXX-X" maxlength="13" v-model="inputs.rif.value"  :class="{'error': !inputs.rif.valid}">
              </div>
            </div>

            <div class="form-line">
              <label class="required">Razón social</label>
              <div>
                <input type="text" maxlength="150" v-model="inputs.bussinessName.value" :class="{'error': !inputs.bussinessName.valid}">
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

            <div class="form-line">
              <button @click="storeClient">
                <i class="fas fa-save"></i>
                Crear cliente
              </button>
            </div>
          </form>
        </div>
      </section>
  `,

  data() {
      return {
        inputs: {
          rifType: {
            value: '',
            valid: true,
            name: 'Tiopo de RIF',
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

  methods: {
    storeClient(e) {
      e.preventDefault();
      if(this.validateForm(this.inputs)) {
        this.$alerts.push({message: `Validado`, type: 'ok'});
      }
    },
  },
});