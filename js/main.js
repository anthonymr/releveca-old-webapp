const VueInstance = new Vue({
    el: "#app",

    data: {
        // Global Menu
        currentModule: {},
        currentPage: 1,

        // Global Cart
        globalCart : [],

        // Client form
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
        
        // Currency Rate
        currencies: [],
    },

    created() {
      // Currency Rate
      this.getCurrencies();
    },

    methods: {
      // Global Menu
      changeModule(module) {
        this.currentModule = module;
      },
      // Global Cart
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
      },
      // Currency Rate
      getCurrencies() {
        axios.post(this.$ajax, { request: 'getCurrencies' })
        .then((response) => {
            this.currencies = response.data;
        })
        .catch((error) => console.error(error));
      },
      rate(currencyCode, currencyRate) {
        let rate = 1;
  
        if(currencyCode !== this.baseCurreny.code) {
            if (currencyCode === this.countryCurrency.code) {
                rate = parseFloat(this.baseCurreny.rate);
            } else {
                rate = parseFloat(currencyRate);
            }
        }
  
        return rate;
      },
    },

    computed: {
      // Global Cart
      globalCartCount() {
        return this.globalCart.reduce((acc, cur) => acc + parseInt(cur.count), 0);
      },
      // Currency Rate
      baseCurreny() {
        return this.currencies.filter((cur) => cur.base === '1')[0];
      },
      countryCurrency() {
          return this.currencies.filter((cur) => parseFloat(cur.rate) === 1)[0];
      }
    }
});

