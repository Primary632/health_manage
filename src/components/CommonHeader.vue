<template>
	<header>
		<div class="l-content">
			<el-button @click="handMenu" plain icon="el-icon-menu" size="mini">
			</el-button>
			<!-- <h3 style="color:#fff ">首页</h3> -->
			<el-breadcrumb separator="/">
				<el-breadcrumb-item
					v-for="item in tags"
					:key="item.path"
					:to="{ path: item.path }"
				>
					{{ item.label }}
				</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="r-content">
			<el-dropdown trigger="click" szie="mini">
            <!-- v-for="item in getCookie" -->
				<span class="el-dropdown-link" >
					<span>{{userName}}</span><i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>个人中心</el-dropdown-item>
					<el-dropdown-item @click.native="loginOut"
						>退出</el-dropdown-item
					>
				</el-dropdown-menu>
			</el-dropdown>
		</div>
	</header>
</template>
<script>
import { mapState } from 'vuex'
import cookie from 'js-cookie'
export default {
	name: 'CommonHeader',
	data() {
		return {
			userImg: require('../assets/images/user.png'),
            userName:''
		}
	},
	methods: {
		handMenu() {
			this.$store.commit('collapseMenu')
		},
		loginOut() {
			this.$store.commit('clearToken')
			this.$store.commit('clearMenu')
            this.$store.commit('clearUser')
			this.$router.push('/login')
		},
       
	},
    created(){
        this.userName=cookie.get('userName')
    },
	computed: {
		...mapState({
			tags: (state) => state.tab.tabsList,
		})
        
	},
}
</script>
<style lang="less" scoped>
header {
	display: flex;
	height: 100%;
	justify-content: space-between;
	align-items: center;
}
.el-dropdown-link{
    color: antiquewhite;
}
.l-content {
	display: flex;
	align-content: center;
}
.l-content > .el-button {
	margin-right: 20px;
}
.r-content > .user {
	width: 40px;
	height: 40px;
	border-radius: 50%;
}
</style>
