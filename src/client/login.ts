import Vue from 'vue';
import Login from './components/Login.vue';

// // Sentry
// Raven.config(settings.Sentry.url).addPlugin(RavenVue, Vue).install()
// Vue.prototype.$raven = Raven

new Vue({
    components: {
      'Login': Login,
    },
    template: '<Login ref="app" />',
}).$mount('#main')