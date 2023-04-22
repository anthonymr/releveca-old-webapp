Vue.component('v_main_panel', {
    props: ['module'],

template: `
        <section id="start">
            <v_header_location :module="activeModule"></v_header_location>
            <div class="main-panel__padding"></div>

            <div v-if="activeModule?.submodule?.id == 1"><v_items :key="key"></v_items></div>
            <div v-else-if="activeModule?.submodule?.id == 3"><v_clients :key="key"></v_clients></div>
            <div v-else-if="activeModule?.submodule?.id == 4"><v_orders :key="key"></v_orders></div>
            <div v-else-if="activeModule?.submodule?.id == 10"><v_orders_approval :key="key"></v_orders_approval></div>
            <div v-else-if="activeModule?.submodule?.id == 11"><v_new_client :key="key"></v_new_client></div>
            <div v-else-if="activeModule?.submodule?.id == 12"><v_clients :key="key" :all="true"></v_clients></div>
            <div v-else></div>
        </section>
    `,
    computed: {
        activeModule() {
            return Object.keys(this.module).length
                ? this.module
                : this.$default;
        },
        key() {
            return this.activeModule?.submodule?.id;
        }
    }

});