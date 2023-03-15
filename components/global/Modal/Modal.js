Vue.component('v_modal', {
    template: `
        <section class="modal-wrapper">
            <div>
                <div class="modal__title">
                    <div>
                        <slot name="title"></slot>
                    </div>
                    <div @click="close()">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div class="modal__body">
                    <slot name="body"></slot>
                </div>
                <div class="modal__footer">
                    <div class="modal__footer-info">
                        <slot name="footer"></slot>
                    </div>
                    <div class="modal__footer-buttons">
                        <slot name="buttons"></slot>
                        <button @click="close()" class="secondary">Cancelar</button>
                    </div>
                </div>
            </div>
        </section>
    `,

    created() {
        document.body.classList.add("modal-open");
    },
    
    methods: {
        close(){
            document.body.classList.remove("modal-open");
            this.$emit('close');
        }
    }
});