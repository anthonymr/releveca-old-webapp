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
                <div class="main-menu__corporation-picture">
                    <img v-if="modules[0]?.corporation_id" :src="'assets/images/corporations/' + modules[0].corporation_id + '.png'" >
                </div>
                <hr>
                <div v-for="module in modules" class="main-menu__module" @click="changeModule(module)" :class="seletedModule == module.id ? 'selected-module' : ''">
                    <i :class="module.icon" class="fa-fw"></i>
                    {{module.name}}
                    <i v-if="seletedModule == module.id" class="fa-solid fa-angle-right fa-fw"></i>
                    <div v-if="seletedModule == module.id" class="main-menu__sub-modules">
                        <div v-for="submodule in selectedSubmodules" @click="changeSubmodule(module, submodule)">
                            {{submodule.name}}
                        </div>
                    </div>
                </div>
                <hr>
                <div class="main-menu__modules-static"><i class="fa-solid fa-address-card fa-fw"></i>Mi perfil</div>
                <div class="main-menu__modules-static"><i class="fa-solid fa-key fa-fw"></i>Cambiar contraseña</div>
                <div class="main-menu__modules-static"><i class="fa-solid fa-building fa-fw"></i></i>Cambiar corporación</div>    
                <div class="main-menu__modules-static"><i class="fa-solid fa-arrow-right-from-bracket fa-fw"></i>Cerrar sesión</div>              
            </div>
        </section>
    `,

    data() {
        return {
            modules: [],
            submodules: [],

            activeMobileMenu: false,
            seletedModule: -1,
        }
    },

    created() {
        this.getModules();
        this.getSubmodules();
    },

    methods: {
        getModules() {
            axios.post(this.$ajax, { request: 'getModules' })
                .then((response) => { this.modules = response.data; })
                .catch((error) => console.error(error));
        },

        getSubmodules() {
            axios.post(this.$ajax, { request: 'getAllSubmodules' })
                .then((response) => { this.submodules = response.data; })
                .catch((error) => console.error(error));
        },

        changeModule(module) {
            if (this.seletedModule != module.id) {
                this.seletedModule = module.id;
            } else {
                this.seletedModule = -1;
            }


            if (this.selectedSubmodules.length === 1) {
                this.$emit('change', {
                    module,
                    submodule: this.selectedSubmodules[0],
                });
                this.activeMobileMenu = false;
                this.seletedModule = -1;
            }

        },

        changeSubmodule(module, submodule) {
            this.$emit('change', {
                module,
                submodule,
            });
            this.activeMobileMenu = false;
            this.seletedModule = -1;
        }
    },

    computed: {
        selectedSubmodules() {
            return this.submodules.filter(sm => {
                return sm.module_id == this.seletedModule;
            });
        }
    }
});