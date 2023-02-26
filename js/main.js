Vue.prototype.$ajax = './backend/ajaxfile.php';

const VueInstance = new Vue({
    el: "#app",

    data: {
        currentModule: { "id": "1", "name": "Inicio", "icon": "" }
    },

    methods: {
      changeModule(moduleId) {
        this.currentModule = moduleId;
      }  
    },
});

