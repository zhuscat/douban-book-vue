/* eslint-disable */
import Vue from 'vue';
import createApp from './app';
import TopProgress from './components/Progress.vue';

const bar = Vue.prototype.$bar = new Vue(TopProgress).$mount();
document.body.appendChild(bar.$el);

const { app, router, store } = createApp();

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}

router.onReady(() => {
  app.$mount('#app');
});
