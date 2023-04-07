Vue.component('v_new_client', {
  template: `
      <section>
        <div class="form-container">
          <form>
            <h3>Crear nuevo cliente</h3>

            <div class="form-line">
              <label>RIF</label>
              <div>
                <select class="form-rif-type">
                  <option>J</option>
                  <option>V</option>
                  <option>G</option>
                  <option>P</option>
                </select>
                <input type="text" placeholder="XXXXXXXX-X" maxlength="13">
              </div>
            </div>

            <div class="form-line">
              <label>Razón social</label>
              <div>
                <input type="text" maxlength="150">
              </div>
            </div>

            <div class="form-line">
              <label>Dirección fiscal</label>
              <div>
                <textarea maxlength="190"></textarea>
              </div>
            </div>

            <div class="form-line">
              <label>Teléfono</label>
              <div>
                <input type="text" class="form-phone-code" maxlength="4" placeholder="02XX"/>
                <input type="text" placeholder="XXXXXXX" maxlength="10">
              </div>
            </div>

            <div class="form-line">
              <label>Notas</label>
              <div>
                <textarea maxlength="200"></textarea>
              </div>
            </div>

            <div class="form-line">
              <label>Impuesto</label>
              <div>
                <input type="checkbox">
              </div>
            </div>

            <div class="form-line">
              <label>Correo</label>
              <div>
                <input type="email">
              </div>
            </div>

          </form>
        </div>
      </section>
  `,

  data() {
      return {
      }
  },
});