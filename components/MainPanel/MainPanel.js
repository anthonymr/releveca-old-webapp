Vue.component('v_main_panel', {
    props: ['module'],

template: `
        <section>
            <v_header_location :module="activeModule"></v_header_location>

            <div v-if="activeModule?.submodule?.id == 1">
                <v_items></v_items>
            </div>
            <div v-else-if="activeModule?.submodule?.id == 2"></div>
            <div v-else-if="activeModule?.submodule?.id == 3"></div>
            <div v-else-if="activeModule?.submodule?.id == 4"></div>
            <div v-else-if="activeModule?.submodule?.id == 5"></div>
            <div v-else-if="activeModule?.submodule?.id == 6"></div>
            <div v-else-if="activeModule?.submodule?.id == 7"></div>
            <div v-else-if="activeModule?.submodule?.id == 8"></div>
            <div v-else-if="activeModule?.submodule?.id == 8"></div>
            <div v-else>
            </div>
        </section>
    `,
    computed: {
        activeModule() {
            return Object.keys(this.module).length
                ? this.module
                : this.$default;
        }
    }

});