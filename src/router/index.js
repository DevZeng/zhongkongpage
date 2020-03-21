import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/schoolStatistics'
        },
        {
            path: '/',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '自述文件' },
            children:[
                {
                    path: '/schoolList',
                    component: resolve => require(['../components/page/SchoolList.vue'], resolve),
                    meta: { title: '学校列表' }
                },
                {
                    path: '/schoolCategory',
                    component: resolve => require(['../components/page/SchoolCategory.vue'], resolve),
                    meta: { title: '学校分类' }
                }, 
                {
                    path: '/schoolStatistics',
                    component: resolve => require(['../components/page/SchoolStatistics.vue'], resolve),
                    meta: { title: '统计报表' }
                },
                {
                    path: '/package',
                    component: resolve => require(['../components/page/Package.vue'], resolve),
                    meta: { title: '包管理' }
                },
                {
                    path: '/finance',
                    component: resolve => require(['../components/page/Finance.vue'], resolve),
                    meta: { title: '财务管理' }
                },
                // {
                //     path: '/goods',
                //     component: resolve => require(['../components/page/Goods.vue'], resolve),
                //     meta: { title: '服务商品管理' }
                // },
                {
                    path: '/equipmentModel',
                    component: resolve => require(['../components/page/EquipmentModel.vue'], resolve),
                    meta: { title: '设备型号' }
                },
                {
                    path: '/administrators',
                    component: resolve => require(['../components/page/Administrators.vue'], resolve),
                    meta: { title: '管理员管理' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '/404',
            component: resolve => require(['../components/page/404.vue'], resolve)
        },
        {
            path: '/403',
            component: resolve => require(['../components/page/403.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})
