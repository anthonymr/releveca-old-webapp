Vue.component('v_item', {
    props: ['item', 'large'],
    template: `
        <article class="card">
            <div class="item__header">
                <div class="item__icons">
                    <div class="item__icon item__icon-input">
                        <input type="number" min="1" v-model="value"/>
                        <i class="fa-solid fa-circle-plus fa-fw" @click="$root.addToCart(item, value)"></i>
                    </div>
                    <div class="item__icon">
                        <i class="fa-solid fa-circle-info fa-fw"></i>
                    </div>
                    <v_edit_item :item="item" @close="$emit('refresh')"></v_edit_item>
                </div>
                <div class="item__price">
                    <div>{{price}}</div>
                    <div class="item__stock">{{inStock}}</div>
                </div>
            </div>
            <div class="card__main_container">
                <div class="card__picture" v-if="large">
                    <img :src="img" @error="error" />
                </div>
                <div class="card__info">
                    <span class="card__code">
                        {{item.code}}
                    </span>
                    <span class="card__title">
                        {{itemName}}
                    </span>
                    <span class="card__model">
                        {{item.model}}
                    </span>
                </div>
            </div>
        </article>
    `,

    data(){
        return {
            imageError: false,
            value: 1,
        }
    },

    methods: {
        error(e){
            this.imageError = true;
        },
    },

    computed: {
        img(){
            if(this.imageError || !this.item.images) return `assets/images/logo-placeholder.svg`;
            const name = this.item.images.split(',')[0];
            return `assets/images/items/${name}?${Date.now()}`;
        },
        itemName(){
            return this.capitalize(this.item.name);
        },
        inStock(){
            const stock = parseFloat(this.item.stock);

            return stock > 1 ? 
                `${stock.toFixed(2)} dispoinbles`:
                `${stock.toFixed(2)} dispoinble`;
        },
        price(){
            return `${parseFloat(this.item.price).toFixed(2)} USD`;
        },
    }
});