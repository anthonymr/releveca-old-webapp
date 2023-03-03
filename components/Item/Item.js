Vue.component('v_item', {
    props: ['item'],
    template: `
        <article class="item">
            <div class="item__picture">
                <img :src="img" @error="error" />
            </div>
            <div class="item__info">
                <span class="item__title">
                    {{itemName}}
                </span>
            </div>
        </article>
    `,

    data(){
        return {
            imageError: false
        }
    },

    methods: {
        error(e){
            this.imageError = true;
        }
    },

    computed: {
        img(){
            if(this.imageError) return `assets/images/logo-placeholder.svg`;
            return `assets/images/items/${this.item.id}_1.jpg`;
        },
        itemName(){
            const words = this.item.name.trim().split(" ");
            return words.map((word) => { 
                return word[0] + word.substring(1).toLowerCase(); 
            }).join(" ");
        }
    }
});