Vue.component('v_main_panel', {
    props: ['module'],

template: `
        <section id="start">
            <v_header_location :module="activeModule"></v_header_location>
            <div class="main-panel__padding"></div>

            <div v-if="activeModule?.submodule?.id == 1"><v_items></v_items></div>
            <div v-else-if="activeModule?.submodule?.id == 3"><v_clients></v_clients></div>
            <div v-else-if="activeModule?.submodule?.id == 4"><v_quotes></v_quotes></div>
            <div v-else-if="activeModule?.submodule?.id == 10"><v_quotes_approval></v_quotes_approval></div>
            <div v-else-if="activeModule?.submodule?.id == 11"><v_new_client></v_new_client></div>
            <div v-else></div>
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