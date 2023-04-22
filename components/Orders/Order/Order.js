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
              <span>total: {{orderTotal}}</span>
              <span v-if="debt" class="debt">deuda: {{orderDebt}}</span>
            </div>
            <div class="order__status">
              <span :class="'label ' + statusColor">
                {{status}}
              </span>
            </div>
            <!--<div class="order__button">
              <v_order_details :order="order"></v_order_details>
            </div>-->
            <div class="order__button" v-if="approve">
              <div class="item__icon" @click="approve(order)" v-if="order.approved === '0'">
                <i class="fa-solid fa-circle-check"></i>
              </div>
            </div>
          </div>
        </div>
      </article>
  `,

  data() {
    return {
    }
  },

  computed: {
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
    status() {
      return this.order.order_status;
    },
    statusColor() {
      if(this.status === 'sistema') return('warning');
      if(this.status === 'en espera') return('default');
      if(this.status === 'por cobrar') return('danger');
      if(this.status === 'pagado') return('ok');
    },
    id() {
      return this.order.order_index || this.order.order_id;
    }
  }
});