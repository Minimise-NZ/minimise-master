import {store} from '../store/store'

export default (to, from, next) => {
  if (store.getters.userKey !== '') {
    next()
  } else {
    next('/login')
  }
}

