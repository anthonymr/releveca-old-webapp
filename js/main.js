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
    },
    validateForm(inputs) {
      let itsAllOk = true;
      for(let value of Object.values(inputs)) {
        if(typeof value.value === 'string') {
          if(value.noWhiteSpaces) value.value = value.value.replace(/\s/g, '');
          value.value = value.value.toUpperCase().trim().replace(/\s\s+/g, ' ');
        }

        if(value.notRequired && !value.maxLength) continue;

        if(!value.notRequired && !value.value) {
          itsAllOk = this.validateFormError(value, `El campo "${value.name}" es obligatorio`);
          continue;
        } else {
          if(value.minLength && value.value.length < value.minLength) {
            itsAllOk = this.validateFormError(value, `El campo "${value.name}" debe tener al menos ${value.minLength} caracteres`);
            continue;
          }

          if(value.maxLength && value.value.length > value.maxLength) {
            itsAllOk = this.validateFormError(value, `El campo "${value.name}" debe tener menos de ${value.maxLength} caracteres`);
            continue;
          }

          if(value.length && value.value.length !== value.length) {
            itsAllOk = this.validateFormError(value, `El campo "${value.name}" debe tener ${value.length} caracteres`);
            continue;
          }

          if(value.regex && !value.regex.test(value.value)) {
            itsAllOk = this.validateFormError(value, `El campo "${value.name}" no es válido`);
            continue;
          }

          value.valid = true;
        }
      };
      
      return itsAllOk;
    },

    validateFormError(input, message) {
      input.valid = false;
      this.$alerts.push({message, type: 'alert'});
      return input.valid;
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

