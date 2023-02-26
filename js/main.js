Vue.prototype.$ajax = './backend/ajaxfile.php';
Vue.prototype.$alerts = [];

const VueInstance = new Vue({
    el: "#app",

    data: {
        currentModule: { "id": "1", "name": "Inicio", "icon": "" },
    },

    methods: {
      changeModule(moduleId) {
        this.currentModule = moduleId;
      }  
    },
});

