Vue.component('v_cart', {

template: `
        <section class="cart__container">
            <transition name="quick" mode="out-in">
                <div class="cart__icon" @click="isOpen = !isOpen" :key="$root.globalCartCount">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <span>{{ $root.globalCartCount }}</span>
                </div>
            </transition>

            <section class="cart__list card" v-if="isOpen">

                <div class="modal__title">
                    <div>
                        <span v-if="!$root.globalCartCount">Carrito vacío</span>
                    </div>
                    <div @click="isOpen = false">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>

                <div class="cart__items">
                    <div class="cart__item" v-for="item in $root.globalCart" v-if="item.count > 0">
                        <div class="cart__picture">
                            <img :src="img(item)" />
                        </div>
                        <div class="cart__name">
                            <div class="cart__code">
                                <div>
                                    {{item.count}} {{item.unit}}
                                </div>
                                <div>
                                    {{itemPrice(item)}}
                                </div>
                                <div>
                                    {{itemTotalPrice(item)}}
                                </div>
                            </div>
                            <div class="card__title">
                                {{capitalize(item.name)}}
                            </div>
                        </div>
                        <div class="cart__item__buttons">
                            <div @click="$root.deleteItemFromCart(item)">
                                <i class="fa-solid fa-circle-minus"></i>
                            </div>
                            <div @click="$root.deleteItemFromCartAll(item)">
                                <i class="fa-solid fa-circle-xmark"></i>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="cart__total" v-if="$root.globalCartCount">
                    <div>
                        <label>sub-total: {{selectedCurrency.code}}</label>
                        <div>{{subTotal.toFixed(2)}}</div>
                    </div>
                    <div>
                        <label>IVA: {{selectedCurrency.code}}</label>
                        <div>{{taxes.toFixed(2)}}</div>
                    </div>
                    <div>
                        <label>Total: {{selectedCurrency.code}}</label>
                        <div>{{total.toFixed(2)}}</div>
                    </div>
                </div>

                <div class="cart__payment" v-if="$root.globalCartCount">
                    <div>
                        <label>IMP <input v-model="selectedTax" type="checkbox" /></label>
                    </div>
                    <v-select 
                        :options="conditions"
                        placeholder="Cond. pago"
                        label="description"
                        v-model="selectedCondition"
                        :clearable="false"
                    >
                    </v-select>
                    <v-select 
                        :options="currencies"
                        placeholder="Moneda"
                        label="code"
                        v-model="selectedCurrency"
                        :clearable="false"
                    >
                    </v-select>
                </div>

                <div class="cart__client" v-if="$root.globalCartCount">
                    <v-select 
                        :options="clients"
                        placeholder="Cliente"
                        label="name"
                        v-model="selectedClient"
                        @option:selecting="setTax"
                    >
                    </v-select>
                </div>

                <div class="cart__buttons">
                    <button v-if="$root.globalCartCount" :disabled="!selectedClient" @click="setOrder">Crear pedido</button>
                    <button v-if="$root.globalCartCount" @click="$root.deleteAllItemsFromCart()" class="secondary">Limpiar carrito</button>
                </div>
            </section>
        </section>
    `,

    data() {
        return {
            isOpen: false,
            clients: [],
            currencies: [],
            conditions: [],
            selectedClient: null,
            selectedCurrency: null,
            selectedTax: false,
            selectedCondition: null,
        }
    },

    created(){
        this.getClients();
        this.getConditions();
    },

    methods: {
        getClients() {
            axios.post(this.$ajax, { request: 'getClientsForInput' })
            .then((response) => this.clients = response.data)
            .catch((error) => console.error(error));
        },
        setOrder(){
            const details = this.$root.globalCart.filter((line) => line.count > 0).map((line) => ({
                item_id: line.id,
                qty: line.count,
                unit: line.unit,
                unit_price: parseFloat(line.price) * this.rate,
                total: parseFloat(line.count) * parseFloat(line.price) * this.rate,
            }));

            axios.post(this.$ajax, { request: 'setOrder',  
            id:this.selectedClient.id, 
            sub_total:this.subTotal, 
            taxes:this.taxes, 
            total:this.total, 
            condition:this.selectedCondition.code, 
            rate:this.selectedCurrency.rate, 
            currency:this.selectedCurrency.code,
            details
        })
            .then((response) => {
                this.$root.deleteAllItemsFromCart();
                this.isOpen = false;
                this.$alerts.push({message: 'Pedido creada correctamente.', type: 'ok'});
            })
            .catch(() => this.$alerts.push({message: 'Error creando la pedido.', type: 'alert'}));
        },
        getConditions() {
            axios.post(this.$ajax, { request: 'getConditions' })
            .then((response) => this.conditions = response.data)
            .catch((error) => console.error(error));
        },
        setTax(selected) {
            this.selectedTax = selected.taxpayer === '1' ? true : false;
        },
        itemPrice(item) {
            const strPrice = (parseFloat(item.price) * this.rate).toFixed(2);
            return `${strPrice} ${this.selectedCurrency.code}`;
        },
        itemTotalPrice(item) {
            const strPrice = (parseFloat(item.price) * this.rate * item.count).toFixed(2);
            return `${strPrice} ${this.selectedCurrency.code}`;
        },
        img(item) {
            if(!item.images) return `assets/images/logo-placeholder.svg`;
            const name = item.images.split(',')[0];
            return `assets/images/items/${name}?${Date.now()}`;
        },
    },

    computed: {
        rate() {
            return this.$root.rate(this.selectedCurrency.code, this.selectedCurrency.rate)
        },
        subTotal() {
            return this.$root.globalCart.reduce((acc, cur) => acc + (cur.count * parseFloat(cur.price)) , 0) * this.rate;
        },
        taxes() {
            return this.selectedTax ? this.subTotal * 0.16 : 0.00;
        },
        total() {
            return this.subTotal + this.taxes;
        },
    }
});