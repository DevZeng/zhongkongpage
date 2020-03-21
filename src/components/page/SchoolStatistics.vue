<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>各学校统计报表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">



            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="school_id" label="学校ID" sortable width="150"></el-table-column>
                <el-table-column prop="school_name" label="学校名称" width="200"></el-table-column>
                <el-table-column prop="user_num" label="用户数"></el-table-column>
                <el-table-column prop="teacher_num" label="老师数"></el-table-column>
                <el-table-column prop="student_sum" label="学生数"></el-table-column>
                <el-table-column prop="visitor_num" label="访客数"></el-table-column>
                <el-table-column prop="order_totle" label="周订单总额"></el-table-column>
            </el-table>






            <!-- <div v-for="(item,index) in data" class="schart">
                <div class="content-title">{{item.title}}</div>
                <schart :canvasId="'id' + index" width="500" height="400" :data="item.data" type="bar" :options="item.options"></schart>
            </div> -->
           <!--  <div class="schart">
                <div class="content-title">柱状图</div>
                <schart canvasId="bar" width="500" height="400" :data="data1" type="bar" :options="options1"></schart>
            </div>
            <div class="schart">
                <div class="content-title">折线图</div>
                <schart canvasId="line" width="500" height="400" :data="data1" type="line" :options="options1"></schart>
            </div>
            <div class="schart">
                <div class="content-title">饼状图</div>
                <schart canvasId="pie" width="500" height="400" :data="data2" type="pie" :options="options2"></schart>
            </div>
            <div class="schart">
                <div class="content-title">环形图</div>
                <schart canvasId="ring" width="500" height="400" :data="data2" type="ring" :options="options2"></schart>
            </div> -->
        </div>
    </div>
</template>

<script>
    import Schart from 'vue-schart';
    export default {
        components: {
            Schart
        },
        data() {
            return {
                data:[],
                tableData:[],
                data1:[
                {name:'2012',value:1141},
                {name:'2013',value:1499},
                {name:'2014',value:2260},
                {name:'2015',value:1170},
                {name:'2016',value:970},
                {name:'2017',value:1450}
            ],
            data2 : [
                {name:'短袖',value:1200},
                {name:'休闲裤',value:1222},
                {name:'连衣裙',value:1283},
                {name:'外套',value:1314},
                {name:'羽绒服',value:2314}
            ],
            options1: {
                title: '某商店近年营业总额',
                bgColor: '#009688',
                titleColor: '#ffffff',
                fillColor: '#e0f2f1',
                axisColor: '#ffffff',
                contentColor: '#999'
            },
            options2: {
                title: '某商店各商品年度销量',
                bgColor: '#607d8b',
                titleColor: '#ffffff',
                legendColor: '#ffffff'
            },
            }
        },
        // data: () => ({
        //     data1:[
        //         {name:'2012',value:1141},
        //         {name:'2013',value:1499},
        //         {name:'2014',value:2260},
        //         {name:'2015',value:1170},
        //         {name:'2016',value:970},
        //         {name:'2017',value:1450}
        //     ],
        //     data2 : [
        //         {name:'短袖',value:1200},
        //         {name:'休闲裤',value:1222},
        //         {name:'连衣裙',value:1283},
        //         {name:'外套',value:1314},
        //         {name:'羽绒服',value:2314}
        //     ],
        //     options1: {
        //         title: '某商店近年营业总额',
        //         bgColor: '#009688',
        //         titleColor: '#ffffff',
        //         fillColor: '#e0f2f1',
        //         axisColor: '#ffffff',
        //         contentColor: '#999'
        //     },
        //     options2: {
        //         title: '某商店各商品年度销量',
        //         bgColor: '#607d8b',
        //         titleColor: '#ffffff',
        //         legendColor: '#ffffff'
        //     },
        //     data:[]
        // })
        created() {
            this.getData();
        },
        methods: {
            // 获取学校统计信息
            getData() {
                let that = this;
                $.ajax({  
                    type : "get",
                    url : json.https + "/school/select_statistics",
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取学校统计信息返回')
                        console.log(res)
                        that.tableData = res.data


                         // let dataList = []
                         // for(let i = 0; i < res.data.length; i++){
                         //    let data = {
                         //        title:res.data[i].school_name,
                         //        options: {
                         //            title: res.data[i].school_name,
                         //            bgColor: '#009688',
                         //            titleColor: '#ffffff',
                         //            fillColor: '#e0f2f1',
                         //            axisColor: '#ffffff',
                         //            contentColor: '#999'
                         //        },
                         //        data:[
                         //            {name:'用户数',value:res.data[i].user_num},
                         //            {name:'老师数',value:res.data[i].teacher_num},
                         //            {name:'学生数',value:res.data[i].student_sum},
                         //            {name:'访客数',value:res.data[i].visitor_num},
                         //            {name:'订单总额',value:res.data[i].order_totle}
                         //        ]
                         //     }
                         //     dataList[dataList.length] = data;
                         // }
                         // that.data = dataList
                    }
                }); 
            }
           
        }
    }
</script>

<style scoped>
    .schart{
        width: 600px;
        display: inline-block;
    }
    .content-title{
        clear: both;
        font-weight: 400;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #1f2f3d;
    }
    
</style>