Vue.component('v_cart', {

template: `
        <section class="cart__container">
            <div class="cart__icon" @click="isOpen = !isOpen">
                <i class="fa-solid fa-basket-shopping"></i>
                <span>{{ $root.globalCart.length }}</span>
            </div>

            <section class="cart__list card" v-if="isOpen">
                {{ $root.globalCart }}
            </section>
        </section>
    `,

    data() {
        return {
            isOpen: false,
        }
    }
});