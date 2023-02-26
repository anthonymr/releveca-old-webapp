Vue.component('v_header_location', {
    props: ['module'],

    template: `
        <section class="header-location">
            <span>{{module?.module?.name}}</span>
            <span v-if="module?.module && module?.submodule">
                <i class="fa-solid fa-angle-right"></i>
            </span>
            <span>{{module?.submodule?.name}}</span>
        </section>
    `,
});