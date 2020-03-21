<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 财务管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">

            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="订单查询" name="list">
                    <div class="handle-box">
                        <el-date-picker
                          v-model="dataText"
                          type="datetimerange"
                          :picker-options="pickerOptions2"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          align="right">
                        </el-date-picker>
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </div>
                    <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="school_id" label="学校ID"></el-table-column>
                        <el-table-column prop="order_id" label="订单ID"></el-table-column>
                        <el-table-column prop="user_openid" label="用户ID" ></el-table-column>
                        <el-table-column prop="user_name" label="用户名" width="120"></el-table-column>
                        <el-table-column prop="goods_name" label="商品名称" width="120"></el-table-column>
                        <el-table-column prop="goods_price" label="商品价格(￥)" width="100"></el-table-column>
                        <el-table-column prop="goods_times" label="商品时长(天)" width="100"></el-table-column>
                        <el-table-column prop="order_status" label="订单状态" width="100">
                            <template slot-scope="scope">
                                <span v-if = "scope.row.order_status == 1" class="green">已支付</span>
                                <span v-else-if = "scope.row.order_status == 0" class="red">未支付</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="creatime" label="创建时间" width="150"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="财务总结" name="summary">
                    <el-table :data="tableData1" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="week" label="周总额"></el-table-column>
                        <el-table-column prop="month" label="月总额"></el-table-column>
                        <el-table-column prop="quarter" label="季度总额"></el-table-column>
                        <el-table-column prop="s_quarter" label="上一季度总额"></el-table-column>
                        <el-table-column prop="year" label="年总额"></el-table-column>
                    </el-table>
                </el-tab-pane>
                
            </el-tabs>
        </div>
    </div>
</template>

<script>
    let goods_id;
    import Schart from 'vue-schart';
    export default {
        data() {
            return {
                tableData: [],
                tableData1:[],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {},
                idx: -1,
                total:0,

                activeName:'list',
                // 时间选择器
                pickerOptions2: {
                  shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近一个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                      picker.$emit('pick', [start, end]);
                    }
                  }, {
                    text: '最近三个月',
                    onClick(picker) {
                      const end = new Date();
                      const start = new Date();
                      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                      picker.$emit('pick', [start, end]);
                    }
                  }]
                },
                dataText: '',

                schartData:[],
                options: {
                    title: '财务总结',
                    bgColor: '#009688',
                    titleColor: '#ffffff',
                    fillColor: '#e0f2f1',
                    axisColor: '#ffffff',
                    contentColor: '#999'
                },
            }
        },
        created() {
            this.getData();
            this.getFinancial();
        },
        components: {
            Schart
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 头部导航点击
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 获取全部订单
            getData() {
                let that = this;
                $.ajax({
                    type : "get",
                    url : json.https + "/school/select_all_order",
                    data:{
                        start: that.cur_page
                    },
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取全部订单返回')
                        console.log(res)
                        that.total = Number(res.totle);
                        that.tableData = res.data
                    }
                }); 
            },
            // 获取财务总结
            getFinancial() {
                let that = this;
                $.ajax({
                    type : "get",
                    url : json.https + "/report/select_report",
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取财务总结返回')
                        console.log(res)
                        that.tableData1 = [res.data];
                        that.schartData = [
                            {name:'周总额',value:res.data.week},
                            {name:'月总额',value:res.data.month},
                            {name:'季度总额',value:res.data.quarter},
                            {name:'年总额',value:res.data.year},
                            {name:'上一季度总额',value:res.data.s_quarter}
                        ]
                    }
                }); 
            },
            // 根据时间段搜索订单
            search(){
                let that = this;
                that.cur_page = 1;
                that.total = 0;

                if(that.dataText){

                    let data_value1 = that.conversion(that.dataText[0], 'yyyy-MM-dd HH:mm:ss')
                    let data_value2 = that.conversion(that.dataText[1], 'yyyy-MM-dd HH:mm:ss')

                    $.ajax({  
                        type : "get",
                        url : json.https + "/report/select_time_o",
                        data:{
                            start_time: data_value1,
                            end_time: data_value2
                        },
                        success : function(res) {
                        console.log('根据分类搜索学校返回')
                        console.log(res)
                            that.total = Number(res.msg);
                            that.tableData = res.data
                        }
                    }); 
                }else{
                    that.$message.error('请选择时间段');
                }
            },
            // 转换时间格式
            conversion(time, format){
                var t = new Date(time);
                var tf = function(i){return (i < 10 ? '0' : '') + i};
                return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
                    switch(a){
                        case 'yyyy': return tf(t.getFullYear()); break;
                        case 'MM': return tf(t.getMonth() + 1); break;
                        case 'mm': return tf(t.getMinutes()); break;
                        case 'dd': return tf(t.getDate()); break;
                        case 'HH': return tf(t.getHours()); break;
                        case 'ss': return tf(t.getSeconds()); break;
                    }
                })
            }
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
    .green{
        display: inline-block;
        padding:0 10px;
        border-radius: 3px;
        background-color:green;
        color:#fff;
    }
    .red{
        display: inline-block;
        padding:0 10px;
        border-radius: 3px;
        background-color:red;
        color:#fff;
    }
</style>
