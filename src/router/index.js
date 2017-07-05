import Vue from 'vue';
import Router from 'vue-router';
import index from '@/components/index/index';
import actionsheet from '@/components/actionsheet/actionsheet';
import popup from '@/components/popup/popup';
import xswitch from '@/components/switch/switch';
import swiper from '@/components/swiper/swiper';
import dropload from '@/components/dropload/dropload';
import xselect from '@/components/select/xselect';
import datetime from '@/components/datetime/datetime';
import swipeout from '@/components/swipeout/swipeout';
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/actionsheet',
      name: 'actionsheet',
      component: actionsheet
    },
    {
      path: '/popup',
      name: 'popup',
      component: popup
    },
    {
      path: '/switch',
      name: 'switch',
      component: xswitch
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: swiper
    },
    {
      path: '/dropload',
      name: 'dropload',
      component: dropload  	
    },
    {
      path: '/xselect',
      name: 'xselect',
      component: xselect  	
    },
    {
      path: '/datetime',
      name: 'datetime',
      component: datetime  	
    },
    {
      path: '/swipeout',
      name: 'swipeout',
      component: swipeout  	
    }
  ]
})
