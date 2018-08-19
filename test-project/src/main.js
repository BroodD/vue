import Vue from 'vue'
import App from './App.vue'

import Math from './components/Math.vue'
import Questions from './components/Math.vue'

import AppMath from './components/Math.vue';
Vue.component('AppMath', AppMath);

import AppQuestions from './components/Questions.vue';
Vue.component('AppQuestions', AppQuestions);

import AppStartScreen from './components/compoMath/StartScreen.vue';
import AppQuestion from './components/compoMath/Question.vue';
import AppMessage from './components/compoMath/Message.vue';
import AppResultScreen from './components/compoMath/ResultScreen.vue';

Vue.component('AppStartScreen', AppStartScreen);
Vue.component('AppQuestion', AppQuestion);
Vue.component('AppMessage', AppMessage);
Vue.component('AppResultScreen', AppResultScreen);

import Timer from './components/compoMath/Timer.vue';
Vue.component('Timer', Timer);



new Vue({
  el: '#app',
  render: h => h(App)
})
