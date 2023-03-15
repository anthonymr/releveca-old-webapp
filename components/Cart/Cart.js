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
                            <div class="card__code">
                                {{item.count}} {{item.unit}}
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

                <div class="cart_client" v-if="$root.globalCartCount">
                    <v-select 
                        :options="clients"
                        placeholder="Cliente"
                        label="name"
                        v-model="selectedClient"
                    >
                    </v-select>
                </div>

                <div class="cart__buttons">
                    <button v-if="$root.globalCartCount" :disabled="!selectedClient" @click="createBudget">Crear presupuesto</button>
                    <button v-if="$root.globalCartCount" @click="$root.deleteAllItemsFromCart()" class="secondary">Limpiar carrito</button>
                </div>
            </section>
        </section>
    `,

    data() {
        return {
            isOpen: false,
            clients: [],
            selectedClient: null,
        }
    },

    created(){
        this.getClients();
    },

    methods: {
        img(item) {
            if(!item.images) return `assets/images/logo-placeholder.svg`;
            const name = item.images.split(',')[0];
            return `assets/images/items/${name}?${Date.now()}`;
        },
        getClients() {
            axios.post(this.$ajax, { request: 'getClientsForInput' })
            .then((response) => { 
                this.clients = response.data;
            })
            .catch((error) => console.error(error));
        },
        createBudget(){
            console.log("working");
        }
    },
});