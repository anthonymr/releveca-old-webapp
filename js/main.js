Vue.component("v-select", VueSelect.VueSelect);

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
    },
    toFixed(str) {
      return parseFloat(str).toFixed(2);
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
        const existing = this.globalCart.filter((curItem) => curItem.code === item.code);

        if(existing.length) {
          existing[0].count += parseInt(count);
          return;
        }

        this.globalCart.push({ 
          ... item,
          count: parseInt(count),
        });
      },
      deleteItemFromCart(item) {
        const existing = this.globalCart.filter((curItem) => curItem.code === item.code);

        if (!existing.length) return;

        if (existing[0].count >= 1) {
          existing[0].count --;
        }
      },

      deleteItemFromCartAll(item) {
        const existing = this.globalCart.filter((curItem) => curItem.code === item.code);

        if (!existing.length) return;
        existing[0].count = 0;
      },

      deleteAllItemsFromCart() {
        this.globalCart.forEach((item) => {
          item.count = 0;
        });
      }
    },

    computed: {
      globalCartCount() {
        return this.globalCart.reduce((acc, cur) => acc + parseInt(cur.count), 0);
      }
    }
});

