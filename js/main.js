Vue.prototype.$ajax = './backend/ajaxfile.php';
Vue.prototype.$alerts = [];

const VueInstance = new Vue({
    el: "#app",

    data: {
        currentModule: {},
    },

    methods: {
      changeModule(module) {
        this.currentModule = module;
      }  
    },
});

