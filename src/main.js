import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
	Button,
	Radio,
	Container,
	Main,
	Header,
	Aside,
	Menu,
	Submenu,
	MenuItem,
	MenuItemGroup,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	Row,
	Col,
	Card,
	Table,
	TableColumn,
	Breadcrumb,
	BreadcrumbItem,
	Tag,
	Form,
	FormItem,
	Input,
	Select,
	Switch,
	DatePicker,
	Option,
	Dialog,
	Pagination,
	MessageBox,
	Message,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import http from 'axios'
import echarts from 'echarts'
import './assets/less/index.less'



Vue.config.silent = true
Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)


// 导航守卫
router.beforeEach((to,from,next)=>{
  store.commit('getToken')
  const token = store.state.user.token
  //
  if (!token && to.name !== 'login') {
		next({ name: 'login' })
  } else if (token && to.name === 'login') {
		next({ name: 'Home' })
  } else if (token && to.name === 'App') {
	  next({ name: 'Home' })
  } else if (!token && to.name === 'App') {
	  next({ name: 'login' })
  }else{
      next()
  }
})

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message




new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  }
}).$mount('#app')
