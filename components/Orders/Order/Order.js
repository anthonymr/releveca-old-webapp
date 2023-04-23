Vue.component('v_order', {
  props: ['order', 'large', 'approve'],
  template: `
      <article class="card order">
        <div class="card__main_container">
          <div class="flex-container order__container">
            <div class="order__id">
              {{id}}
            </div>
            <div class="order__description">
              {{capitalize(order.name)}}
            </div>
            <div class="order__amounts">
              <span>total: <span class="number">{{orderTotal}}</span></span>
              <span v-if="debt" class="debt">deuda: <span class="number">{{orderDebt}}</span></span>
            </div>
            <div class="order__status">
              <span :class="'label ' + statusColor(status, true)">
                {{status?.status}}
              </span>
            </div>
            <div class="order__button" v-if="approve">
              <div class="item__icon" @click="approve(order)" v-if="order.approved === '0'">
                <i class="fa-solid fa-circle-check"></i>
              </div>
            </div>
          </div>
          <div class="flex-container">
            <div class="card__menu">
              <v_order_details :order="order"></v_order_details>
              <div @click="showHistory = !showHistory" :class="{'alert-important': showHistory}">
                <i class="fa-solid fa-clock-rotate-left"></i>
                <span>Historia</span>
              </div>
              <div>
              <i class="fa-solid fa-money-bill"></i>
                <span>Pagos</span>
              </div>
              <div v-if="previousStatus" class="big" @click="toPreviousStatus">
                <i class="fa-solid fa-backward"></i>
                <span>{{previousStatus.status}}</span>
              </div>
              <div v-if="nextStatus" class="big" @click="toNextStatus">
                <i class="fa-solid fa-forward"></i>
                <span>{{nextStatus.status}}</span>
              </div>
            </div>
          </div>

          <!-- HISTORY -->

          <div class="flex-container" v-if="showHistory">
            <table class="small padded">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th></th>
                  <th>Nuevo estado</th>
                  <th>Por</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in history">
                  <td>{{item.moment}}</td>
                  <td class="center">
                    <i :class="historyDirection(item.from, item.to)"></i>
                  </td>
                  <td>
                    <span :class="'label ' + statusColor(getStatusInfo(item.to), true)">
                      {{getStatusInfo(item.to).status}}
                    </span>
                  </td>
                  <td>{{item.name}} {{item.lastname}}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
  `,

  data() {
    return {
      statuses: [],
      history: [],
      showHistory: false
    }
  },

  created() {
    this.getOrderStatuses();
    this.getOrderHistory();
  },

  methods: {
    historyDirection(from, to) {
      if(parseInt(from) > parseInt(to)) return "fa-solid fa-backward";
      return "fa-solid fa-forward";
    },
    getStatusInfo(status) {
      return this.statuses.find(item => item.id === status);
    },
    getOrderHistory() {
      axios.post(this.$ajax, { request: 'getOrderHistory', id: this.order.order_id })
        .then(response => this.history = response.data)
        .catch(error => console.error(error));
    },
    statusColor(status, background = false) {
      if(!status && !background) return('default-font');
      if(!status) return('default');
      
      let cssClass = '' 

      if(status?.id === '1') cssClass = 'default';
      if(status?.id === '2') cssClass = 'warning';
      if(status?.id === '3') cssClass = 'info';
      if(status?.id === '4') cssClass = 'ok';

      return background ? cssClass : cssClass + '-font-full';
    },
    toNextStatus() {
      if(confirm('¿Está seguro de cambiar el estado de la orden a ' + this.nextStatus.status + '?'))
        this.changeOrderStatus(this.nextStatus.id);
    },
    toPreviousStatus() {
      if(confirm('¿Está seguro de cambiar el estado del pedido a ' + this.previousStatus.status + '?'))
        this.changeOrderStatus(this.previousStatus.id);
    },
    getOrderStatuses() {
      axios.post(this.$ajax, { request: 'getOrderStatuses' })
        .then(response => this.statuses = response.data)
        .catch(error => console.error(error));
    },
    changeOrderStatus(status) {
      axios.post(this.$ajax, { request: 'changeOrderStatus', id: this.order.order_id, from:this.status.id, to: status })
        .then((response) => {
          console.log(response.data);
          this.$alerts.push({message: 'El estado del pedido ha sido cambiado correctamente.', type: 'ok'});
          this.$emit('refresh');
          this.getOrderHistory();
        })
        .catch(error => console.error(error));
    }
  },

  computed: {
    nextStatus() {
      const current = parseInt(this.status?.id);
      return this.statuses.find(status => status.id == current + 1);
    },
    previousStatus() {
      const current = parseInt(this.status?.id);
      return this.statuses.find(status => status.id == current - 1);
    },
    status() {
      return this.statuses.find(status => status.id === this.order.order_status);
    },
    total() {
      return parseFloat(this.order.total);
    },
    debt() {
      return parseFloat(this.order.balance);
    },
    orderTotal() {
      const total = this.toLocal(this.order.total);
      return `${total} ${this.order.currency}`;
    },
    orderDebt() {
      const debt = this.toLocal(this.order.balance);
      return `${debt} ${this.order.currency}`;
    },
    id() {
      return this.order.order_index || this.order.order_id;
    }
  }
});