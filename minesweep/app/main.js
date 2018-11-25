import Vue from 'nativescript-vue'
import App from './components/App'

// import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

// TNSFontIcon.debug = true;
// TNSFontIcon.paths = {
//   'fa': './font-awesome.css',
//   'ion': './ionicons.css'
// };
// TNSFontIcon.loadCss();

// Vue.filter('fonticon', fonticon);
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')


new Vue({
  render: h => h('frame', [h(App)])
}).$start()
