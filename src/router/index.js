import Vue from 'vue';
import Router from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(Router);

export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/:tag?',
        name: 'Home',
        component: Home,
      },
    ],
  });
}
