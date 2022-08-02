import { createApp } from 'vue';
import App from './App.vue';
import store from './store';
import routes from './routes';
import 'bootstrap/scss/bootstrap.scss';
import '@/assets/scss/main.scss';
import executeInterceptors from '@/services/interceptors';

const app = createApp(App);

executeInterceptors(app);
app.config.globalProperties.$store = store;
app.use(store);
app.use(routes);
app.mount('#app');
