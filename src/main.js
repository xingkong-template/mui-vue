// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import './js/common/flexible.js';
import actionsheet from './js/lib/actionsheet.js';
import popup from './js/lib/popup.js';
import clearTime from './js/common/clearTime.js';
import Vuex from 'vuex';
import vuexI18n from 'vuex-i18n';
import $ from 'jquery';
Vue.use(Vuex);
window.actionsheet = actionsheet;
window.popup = popup;
Vue.config.productionTip = false;
let store = new Vuex.Store({
  modules: {
    i18n: vuexI18n.store
  }
})

store.registerModule('muivue', {
  state: {
    demoScrollTop: 0,
    isLoading: false,
    direction: 'forward',
    title:'',
    backBtn:true,
    moreBtn:false
  },
  mutations: {
    updatePosition (state, payload) {
      state.demoScrollTop = payload.top
    },
    updateLoadingStatus (state, payload) {
      state.isLoading = payload.isLoading
    },
    updateDirection (state, payload) {
      state.direction = payload.direction
    },
    updateHeader (state, payload) {
    	console.log(payload)
      state.title = payload.title
      state.backBtn = payload.backBtn
      state.moreBtn = payload.moreBtn
    }
  },
  actions: {
    updatePosition ({commit}, top) {
      commit({type: 'updatePosition', top: top})
    }
  }
})

Vue.use(vuexI18n.plugin, store)
const history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
router.beforeEach(function (to, from, next) {
	clearTime.clearTime();
	$('#popup').remove();
  store.commit('updateLoadingStatus', {isLoading: true});
	if(to.name=='index'){
		store.commit('updateHeader', {title: to.name,backBtn:false,moreBtn:true});
	}else{
		store.commit('updateHeader', {title: to.name,backBtn:true,moreBtn:false});
	}
  const toIndex = history.getItem(to.path);
  const fromIndex = history.getItem(from.path);
  if (toIndex) {
    if (toIndex > fromIndex || !fromIndex || (toIndex === '0' && fromIndex === '0')) {
      store.commit('updateDirection', {direction: 'forward'})
    } else {
      store.commit('updateDirection', {direction: 'reverse'})
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    store.commit('updateDirection', {direction: 'forward'})
  }

  if (/\/http/.test(to.path)) {
    let url = to.path.split('http')[1]
    window.location.href = `http${url}`
  } else {
    next()
  }
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
  if (process.env.NODE_ENV === 'production') {
    ga && ga('set', 'page', to.fullPath)
    ga && ga('send', 'pageview')
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
