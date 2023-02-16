Vue.prototype.$ajax = './backend/ajaxfile.php';

const VueInstance = new Vue({
    el: "#app",

    data: {
        currentModule: 1
    },

    methods: {
      changeModule(moduleId) {
        this.currentModule = moduleId;
      }  
    },
});

