Vue.mixin({
  methods: {
    scrollTo(elementId, behavior='smooth') {
      const element = document.getElementById(elementId);
      element.scrollIntoView({ behavior });
    },
    capitalize(str) {
      if(!str) return '';
      const words = str.trim().split(" ");
      return words.map((word) => { 
          return word[0] + word.substring(1).toLowerCase(); 
      }).join(" ");
    },
    toFixed(str) {
      return parseFloat(str).toFixed(2);
    },
    toLocal(num) {
      if(typeof num === 'string') num = parseFloat(num);

      return num.toLocaleString('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
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
    },
    clearFormFields(inputs){
      for(let input of Object.values(inputs)) {
        input.value = typeof input.value === 'boolean' ? false : '';
        input.valid = true;
      }
    },
    phoneToWhatsapp(phone) {
      if(phone[0] === '0') phone = phone.replace(/^0/g, '');
      phone = phone.replace(/[-\s]/g, '');
      return `https://wa.me/58${phone}`;
    },
    toBase64Async(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    },
    documentTypeTpFAIcon(documentType) {
      switch(documentType) {
        case 'pdf': return 'fa-solid fa-file-pdf';
        case 'doc': return 'fa-solid fa-file-word';
        case 'docx': return 'fa-solid fa-file-word';
        case 'xls': return 'fa-solid fa-file-excel';
        case 'xlsx': return 'fa-solid fa-file-excel';
        case 'ppt': return 'fa-solid fa-file-powerpoint';
        case 'pptx': return 'fa-solid fa-file-powerpoint';
        case 'txt': return 'fa-solid fa-file-alt';
        case 'jpg': return 'fa-solid fa-file-image';
        case 'jpeg': return 'fa-solid fa-file-image';
        case 'png': return 'fa-solid fa-file-image';
        case 'gif': return 'fa-solid fa-file-image';
        case 'bmp': return 'fa-solid fa-file-image';
        case 'svg': return 'fa-solid fa-file-image';
        default: return 'fa-solid fa-file';
      }
    },
    assignClient(client) {
      const rifType = client.rif[0].toUpperCase();
      if (rifType === 'J' || rifType === 'G' || rifType === 'V' || rifType === 'P') {
        this.$root.clientInputs.rifType.value = rifType;
        this.$root.clientInputs.rif.value = client.rif.replaceAll('-', '').slice(1);
      } else {
        this.$root.clientInputs.rif.value = client.rif.replaceAll('-', '');
      }
      this.$root.clientInputs.bussinessName.value = client.name;
      this.$root.clientInputs.address.value = client.address;

      if (client.phone.split('-')[0].length === 4) {
        this.$root.clientInputs.phoneCode.value = client.phone.split('-')[0];
        this.$root.clientInputs.phone.value = client.phone.split('-')[1];
      }

      this.$root.clientInputs.notes.value = client.notes;
      this.$root.clientInputs.email.value = client.email;
      this.$root.clientInputs.tax.value = Number(client.taxpayer);
    },
    async checkUserClientsLimit(user='') {
      const clientLimitResponse = await axios.post(this.$ajax, {request: 'checkUserClientsLimit', user});
      const clientLimit = parseFloat(clientLimitResponse.data[0].client_limit);

      const clientsCountResponse = await axios.post(this.$ajax, {request: 'userClientsCount', user});
      const clientsCount = parseFloat(clientsCountResponse.data[0].count);

      return clientLimit > clientsCount;
    }
  }
});