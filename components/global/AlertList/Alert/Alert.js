Vue.component('v_alert', {
    props: ['message', 'type', 'important'],

    template: `
        <section class="alert-card">
            <div class="alert-card__body" :class="{'alert-important': important}">
                <div class="alert-card__icon" :class="type + '-font'">
                    <i :class="icon"></i>
                </div>
                <div class="alert-card__message">
                    {{message}}
                </div>
                <div class="alert-card__close" @click="$emit('completed')">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="alert-card__footer-bar" :class="type" ></div>
        </section>
    `,

    data() {
        return {
        }
    },

    created() {
        setTimeout(() => {
            this.$emit("completed");
        }, "5500")
    },

    methods: {
    },

    computed: {
        icon() {
            let icon = "fa-solid fa-circle-info";

            switch(this.type) {
                case "warning":
                    icon = "fa-solid fa-triangle-exclamation";
                    break;
                case "alert":
                    icon = "fa-solid fa-circle-exclamation";
                    break;
                case "ok":
                    icon = "fa-solid fa-circle-check";
                    break;
            }

            return icon;
        },
    }
});