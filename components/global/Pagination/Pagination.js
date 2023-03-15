Vue.component('v_pagination', {
    props: ['request', 'filter'],
    template: `
        <section>
            <div>
                <div class="pagination" v-if="pages <= 7">
                    <span v-for="index in pages" :key="index" @click="goTo(index)" :class="{'active': $root.currentPage == index}">
                        {{index}}
                    </span>
                </div>
                <div class="pagination" v-else>
                    <span @click="goTo($root.currentPage - 1)" class="no-background">
                        <i class="fa-solid fa-chevron-left"></i>
                    </span>
                    <span v-for="index in firstPages()" :key="index" @click="goTo(index)" :class="{'active': $root.currentPage == index}">
                        {{index}}
                    </span>
                    <span v-if="$root.currentPage > 5" class="no-background">
                        <i class="fa-solid fa-ellipsis"></i>
                    </span>
                    <span v-for="index in middlePages()" :key="index" @click="goTo(index)" :class="{'active': $root.currentPage == index}">
                        {{index}}
                    </span>
                    <span v-if="$root.currentPage < pages" class="no-background">
                        <i class="fa-solid fa-ellipsis"></i>
                    </span>
                    <span v-for="index in lastPages()" :key="index" @click="goTo(index)" :class="{'active': $root.currentPage == index}">
                        {{index}}
                    </span>
                    <span @click="goTo($root.currentPage + 1)" class="no-background">
                        <i class="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
            </div>
            <slot name="list"></slot>
            <div>
                <div class="pagination" v-if="pages <= 7">
                    <span v-for="index in pages" :key="index" @click="goTo(index)" :class="{'active': $root.currentPage == index}">
                        {{index}}
                    </span>
                </div>
                <div class="pagination" v-else>
                    <span @click="goTo($root.currentPage - 1)" class="no-background">
                        <i class="fa-solid fa-chevron-left"></i>
                    </span>
                    <span v-for="index in firstPages()" :key="index" @click="goTo(index)" :class="{'active': $root.currentPage == index}">
                        {{index}}
                    </span>
                    <span v-if="$root.currentPage > 5" class="no-background">
                        <i class="fa-solid fa-ellipsis"></i>
                    </span>
                    <span v-for="index in middlePages()" :key="index" @click="goTo(index)" :class="{'active': $root.currentPage == index}">
                        {{index}}
                    </span>
                    <span v-if="$root.currentPage < pages" class="no-background">
                        <i class="fa-solid fa-ellipsis"></i>
                    </span>
                    <span v-for="index in lastPages()" :key="index" @click="goTo(index)" :class="{'active': $root.currentPage == index}">
                        {{index}}
                    </span>
                    <span @click="goTo($root.currentPage + 1)" class="no-background">
                        <i class="fa-solid fa-chevron-right"></i>
                    </span>
                </div>
            </div>
            
        </section>
    `,

    data() {
        return {
            count: 0,
            itemsToDisplay: 10,
        }
    },

    created() {
        this.$root.currentPage = 1;
        this.getCount();
    },

    methods: {
        goTo(page){
            if(page < 1 || page > this.pages) return;
            let from = (page * this.itemsToDisplay) - this.itemsToDisplay;
            let display = this.itemsToDisplay;
            this.$root.currentPage = page;

            this.$emit('change', from, display, this.filter);
        },
        getCount() {
            axios.post(this.$ajax, { request: this.request, filter: this.filter })
            .then((response) => { this.count = response.data[0].count })
            .catch((error) => console.error(error));
        },
        firstPages(){
            if(this.$root.currentPage <= 5) return [1, 2, 3, 4, 5];
            if(this.$root.currentPage === this.pages) return [1, 2, 3, 4, 5];
            return [1];
        },
        middlePages(){
            if(this.$root.currentPage <= 5) return [];
            if(this.$root.currentPage === this.pages) return [];
            if(this.$root.currentPage === 4) return [4, 5, 6];
            if(this.$root.currentPage === this.pages - 1) 
                return [
                    this.$root.currentPage - 2,
                    this.$root.currentPage - 1,
                    this.$root.currentPage,
                ]
            return [
                this.$root.currentPage - 1,
                this.$root.currentPage,
                this.$root.currentPage + 1,
            ]
        },
        lastPages(){
            return [this.pages];
        }
    },

    watch: {
        filter() {
            this.getCount();
            this.goTo(1);
        }
    },

    computed: {
        pages() {
            return Math.ceil(this.count / this.itemsToDisplay);
        }
    }
});