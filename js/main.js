const VueInstance = new Vue({
    el: "#app",

    data: {
        currentModule: {},
        currentPage: 1,
        globalCart : [],

        clientInputs: {
          rifType: {
            value: '',
            valid: true,
            name: 'Tipo de RIF',
          },
          rif: {
            value: '',
            valid: true,
            name: 'RIF',
            minLength: 7,
            maxLength: 13,
            noWhiteSpaces: true,
          },
          bussinessName: {
            value: '',
            valid: true,
            name: 'Razón social',
            minLength: 10,
            maxLength: 150,
          },
          address: {
            value: '',
            valid: true,
            name: 'Dirección fiscal',
            minLength: 20,
            maxLength: 190,
          },
          phoneCode: {
            value: '',
            valid: true,
            name: 'Código de área',
            length: 4,
            noWhiteSpaces: true,
          },
          phone: {
            value: '',
            valid: true,
            name: 'Teléfono',
            length: 7,
            noWhiteSpaces: true,
          },
          notes: {
            value: '',
            valid: true,
            name: 'Notas',
            notRequired: true,
            maxLength: 200,
          },
          email: {
            value: '',
            valid: true,
            name: 'Correo',
            regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            maxLength: 100,
            noWhiteSpaces: true,
          },
          tax: {
            value: false,
            valid: true,
            name: 'Impuesto',
            notRequired: true,
          },
        },
    },

    methods: {
      changeModule(module) {
        this.currentModule = module;
      },
      addToCart(item, count) {
        const existing = this.globalCart.filter((curItem) => curItem.code === item.code);

        if(parseInt(count) > parseInt(item.stock)) {
          this.$alerts.push({message: 'No se puede agregar más de lo que hay en stock.', type: 'alert'});
          return;
        }

        if(existing.length) {
          if(existing[0].count + parseInt(count) > parseInt(item.stock)) {
            this.$alerts.push({message: 'No se puede agregar más de lo que hay en stock.', type: 'alert'});
            return;
          }

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

