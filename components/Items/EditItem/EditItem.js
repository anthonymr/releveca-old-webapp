Vue.component('v_edit_item', {
    props: ['item'],
    
    template: `
        <div class="item__icon">
            <i 
                class="fa-solid fa-pen fa-fw"
                @click="showModal = true"
                ></i>
            <v_modal 
                v-if="showModal"
                @close="showModal = false"
                >
                <span slot="title">{{item.name.toLowerCase()}}</span>
                <div slot="body">
                    <div if="!images.length" class="edit-item__image">
                        <div>Imagen principal</div>
                        <label>
                            <input type="file" @change="setPicture" />
                            <img 
                            :src="img" 
                            @error="error"
                            alt="Artículo sin imagen" 
                            />
                        </label>
                    </div>
                </div>
                <template slot="buttons">
                    <button @click="store">Guardar</button>
                </template>
            </v_modal>
        </div>
    `,

    data() {
        return {
            showModal: false,
            newPicture: '',
            imageError: false,
        }
    },

    methods: {
        store(){
            if(!this.newPicture) {
                document.body.classList.remove("modal-open");
                this.showModal = false;
                return;
            }
            axios.post(this.$ajax, { 
                request: 'storePicture',
                id: this.item.id,
                name: `${this.item.id}_0.png`,
                pic: this.newPicture,
                firstPicture: true,
            })
                .then(() => { 
                    this.$emit('close');
                    document.body.classList.remove("modal-open");
                    this.showModal = false;
                })
                .catch((error) => console.error(error));
        },
        error(e){
            this.imageError = true;
        },
        setPicture(e){
            if (e.target.files.length > 0) {
                let file = e.target.files[0];
                this.toBase64(file);
            } else {
                this.newPicture = '';
            }
        },
        toBase64(file) {
            let reader = new FileReader();

            reader.onloadend = () => {
                this.newPicture = reader.result;
            };

            if (file) {
                reader.readAsDataURL(file);
            }
        },
    },

    computed: {
        images(){
            if(!this.item.images) return [];
            return this.item.images.split(',');
        },
        img(){
            if(this.imageError) return `assets/images/logo-placeholder.svg`;
            if(this.newPicture) return this.newPicture;
            if(this.item.images) {
                const name = this.item.images.split(',')[0];
                return `assets/images/items/${name}?${Date.now()}`;
            }
            return `assets/images/logo-placeholder.svg`;
        },
    }
});