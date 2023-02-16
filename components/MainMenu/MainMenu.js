Vue.component('v_main_menu', {

    template: `
        <section class="main-menu__wrapper" 
            :class="activeMobileMenu ? 'active-mobile-menu__wrapper' : ''"
            >
            <div class="main-menu__mobile-hamburger" 
                 :class="activeMobileMenu ? 'active-mobile-menu' : ''"
                 @click="activeMobileMenu = !activeMobileMenu"
                >
                <div></div>
                <div></div>
                <div></div>
            </div>

            <div class="main-menu__modules-wrapper" 
                :class="activeMobileMenu ? 'active-mobile-menu__modules-wrapper' : ''"            
                >
                <div v-for="module in modules">
                    {{module.name}}
                </div>
            </div>
        </section>
    `,

    data() {
        return {
            modules: [],
            activeMobileMenu: false,
        }
    },

    created() {
        this.getModules();
    },

    methods: {
        getModules(){
            axios.post(this.$ajax, { request: 'getModules' })
            .then((response) => {this.modules = response.data;})
            .catch((error) => console.error(error));
        },
    },
});