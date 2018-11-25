import Vue from 'nativescript-vue'
import App from './components/App'

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);



new Vue({
  render: h => h('frame', [h(App)])
}).$start()
