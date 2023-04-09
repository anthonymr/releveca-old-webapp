Vue.component('v_client', {
  props: ['client', 'large', 'admin'],
  template: `
      <article class="card">
        <div class="card__main_container">
          <div class="flex-container">
            <div class="card__picture--small" v-if="large">
                <img :src="img" @error="error" />
            </div>

            <div class="client__header">
              <div class="card__line">
                <span class="card__title bold">
                    {{clientName}}
                </span>
              </div>

              <div class="card__line">
                <span class="card__label">
                    RIF:
                </span>
                <span class="card__title">
                    {{client.rif}}
                </span>
              </div>

              <div class="card__line" v-if="large">
                <span class="card__label">
                    Teléfono:
                </span>
                <span class="card__title">
                  <a :href="phoneToWhatsapp(client.phone)" target="_blank">
                    {{client.phone}}
                  </a>                    
                </span>
              </div>

              <div class="card__line" v-if="large">
                <span class="label" :class="label">
                    {{client.status}}
                </span>

                <span class="label info" v-if="admin && client.owner_name">
                    {{client.owner_name}}
                </span>
              </div>
            </div>
          </div>

          <div class="client__info" v-if="client.email.trim() && large">
            <span class="card__label">
                Correo:
            </span>
            <span class="card__title">
                <a :href="'mailto:' + client.email">
                  {{client.email.toLowerCase()}}
                </a>
            </span>
          </div>
          
          <div class="client__info" v-if="client.address1.trim() && large">
            <span class="card__label">
                Dirección:
            </span>
            <span class="card__title">
                {{capitalize(client.address1)}}
            </span>
          </div>

          <div class="client__info">
            <span class="card__label">
                
            </span>
          </div>

          <div class="client_menu">
            <div>
              <i class="fas fa-edit"></i>
              <span>editar</span>
            </div>
            <v_client_files :client="client" />
            <div v-if="this.client.status === 'aprobado'">
              <i class="fas fa-file-invoice"></i>
              <span>Pedidos</span>
            </div>
            <div v-if="this.client.status === 'por aprobar' && admin">
              <i class="fa-solid fa-thumbs-up"></i>
              <span>Aprov.</span>
            </div>
            <div v-if="admin">
              <i class="fa-solid fa-user-tag"></i>
              <span>Reasig.</span>
            </div>
          </div>

        </div>
      </article>
  `,

  data() {
    return {
      imageError: false,
      value: 1,
    }
  },

  methods: {
    error(e) {
      this.imageError = true;
    }
  },

  computed: {
    img() {
      if (this.imageError || !this.client.images) return `assets/images/logo-placeholder.svg`;
      const name = this.client.images.split(',')[0];
      return `assets/images/clients/${name}?${Date.now()}`;
    },
    clientName() {
      return this.capitalize(this.client.name);
    },
    label() {
      return this.client.status === 'aprobado' ? 'ok' : 'default';
    }
  }
});