Vue.prototype.$ajax = './backend/ajaxfile.php';
Vue.prototype.$alerts = [];
Vue.prototype.$default = {
  "module": {
      "id": "2",
      "name": "Artículos",
      "icon": "fa-solid fa-boxes-stacked",
      "corporation_id": "1"
  },
  "submodule": {
      "id": "1",
      "module_id": "2",
      "name": "Ver todos"
  }
};

Vue.mixin({
  methods: {
    scrollTo(elementId, behavior='smooth') {
      const element = document.getElementById(elementId);
      element.scrollIntoView({ behavior });
    },
    capitalize(str) {
      const words = str.trim().split(" ");
      return words.map((word) => { 
          return word[0] + word.substring(1).toLowerCase(); 
      }).join(" ");
    }
  }
})

const VueInstance = new Vue({
    el: "#app",

    data: {
        currentModule: {},
        currentPage: 1,
        globalCart : [],
    },

    methods: {
      changeModule(module) {
        this.currentModule = module;
      },
      addToCart(item, count) {
        this.globalCart.push({ 
          ... item,
          count,
        });
      }
    },
});

