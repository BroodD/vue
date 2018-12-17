import store from '../store'

export default function (to, from, next) {
  if (store.getters.userId) {
    next()
  } else {
    next('/login?loginError=true')
  }
}
