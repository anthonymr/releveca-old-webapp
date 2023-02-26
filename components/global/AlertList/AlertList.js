Vue.component('v_alert_list', {
    props: ['value'],
    template: `
        <section class="alert-list">
            <transition-group name="fade">
                <v_alert v-for="alert, index in alerts"
                    :key="alert.message + index"
                    v-if="alert.active || !alert.hasOwnProperty('active')"
                    :message="alert.message"
                    :type="alert.type"
                    @completed="$set(alert, 'active', false)"
                    ></v_alert>
            </transition-group>
        </section>
    `,

    data() {
        return {
            alerts: this.value,
        }
    },
});