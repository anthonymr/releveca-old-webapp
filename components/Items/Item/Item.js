Vue.component('v_item', {
    props: ['item', 'large'],
    template: `
        <article class="item">
            <div class="item__header">
                <div class="item__icons">
                    <div class="item__icon item__icon-input">
                        <input type="number" min="1" v-model="value" />
                        <i class="fa-solid fa-circle-plus fa-fw"></i>
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
            <div class="item__main_container">
                <div class="item__picture" v-if="large">
                    <img :src="img" @error="error" />
                </div>
                <div class="item__info">
                    <span class="item__code">
                        {{item.code}}
                    </span>
                    <span class="item__title">
                        {{itemName}}
                    </span>
                    <span class="item__model">
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
        }
    },

    computed: {
        img(){
            if(this.imageError || !this.item.images) return `assets/images/logo-placeholder.svg`;
            const name = this.item.images.split(',')[0];
            return `assets/images/items/${name}?${Date.now()}`;
        },
        itemName(){
            const words = this.item.name.trim().split(" ");
            return words.map((word) => { 
                return word[0] + word.substring(1).toLowerCase(); 
            }).join(" ");
        },
        inStock(){
            const stock = parseFloat(this.item.stock);

            return stock > 1 ? 
                `${stock.toFixed(2)} dispoinbles`:
                `${stock.toFixed(2)} dispoinble`;
        },
        price(){
            return `${parseFloat(this.item.price).toFixed(2)} USD`;
        }
    }
});