<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 学校管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd">添加学校</el-button>
                <el-select v-model="class_id" placeholder="选择分类" class="handle-select mr10">
                   <el-option v-for="(item,index) in schoolCategory" :key="index" :label="item.class_name" :value="item.class_id"></el-option>
                </el-select>
                <el-button type="primary" icon="search" @click="search(true)">搜索</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column prop="id" label="ID" width="80"></el-table-column>
                <el-table-column prop="school_id" label="学校ID" sortable width="150"></el-table-column>
                <el-table-column prop="school_name" label="学校名称" ></el-table-column>
                <el-table-column prop="domain_name" label="学校域名" ></el-table-column>
                <!-- <el-table-column prop="school_user" label="学校总用户数"></el-table-column>
                <el-table-column prop="school_student" label="学校总学生数"></el-table-column>
                <el-table-column prop="school_visitor" label="学校总访客数"></el-table-column>
                <el-table-column prop="school_order" label="学校总订单数"></el-table-column> -->
                <el-table-column prop="creatime" label="创建时间"></el-table-column>
                <el-table-column fixed="right" label="操作" width="300">
                    <template slot-scope="scope">
                         <el-tooltip class="item" effect="light" content="修改学校信息" placement="top" :open-delay="time">
                            <el-button size="small" type="primary" icon="el-icon-edit-outline" @click="handleAdd(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                         <el-tooltip class="item" effect="light" content="同步数据" placement="top" :open-delay="time">
                            <el-button size="small" type="primary" icon="el-icon-sort" @click="synchronous(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" content="查看用户" placement="top" :open-delay="time">
                            <el-button size="small" type="primary" icon="el-icon-view" @click="showUser(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" content="查看财务" placement="top" :open-delay="time">
                            <el-button size="small" type="primary" icon="el-icon-tickets" @click="showFinance(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                        <el-tooltip class="item" effect="light" content="登录子后台" placement="top" :open-delay="time">
                            <el-button size="small" type="primary" icon="el-icon-printer" @click="toLogin(scope.$index, scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                 <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total"></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="添加学校" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="学校ID">
                    <el-input v-model="form.school_id" :disabled="!addsch" ></el-input>
                </el-form-item>
                <el-form-item label="学校名称">
                    <el-input v-model="form.school_name"></el-input>
                </el-form-item>
                <el-form-item label="学校域名">
                    <el-input v-model="form.domain_name"></el-input>
                </el-form-item>
                <el-form-item label="子后台地址">
                    <el-input v-model="form.jump"></el-input>
                </el-form-item>
                <el-form-item label="学校类别" v-if="addsch">
                    <el-select v-model="form.class_id" placeholder="选择分类" class="handle-select mr10">
                        <el-option v-for="(item,index) in schoolCategory1" :key="index" :label="item.class_name" :value="item.class_id">
                    </el-option>
                </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 用户弹出框 -->
        <el-dialog title="用户管理" :visible.sync="userVisible" width="90%">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="用户列表" name="user">
                    <el-table :data="tableData1" border style="width: 100%" ref="multipleTable">
                        <!-- <el-table-column prop="id" label="ID" width="80"></el-table-column> -->
                        <!-- <el-table-column prop="school_id" label="学校ID" width="150"></el-table-column> -->
                        <el-table-column prop="user_openid" label="用户ID" sortable width="120"></el-table-column>
                        <el-table-column prop="user_image" label="头像"><template slot-scope="scope"><img :src="scope.row.user_image" style="max-width:70px;max-height:70px;" /></template></el-table-column>
                        <el-table-column prop="user_alias" label="昵称"></el-table-column>
                        <el-table-column prop="user_name" label="名称"></el-table-column>
                        <el-table-column prop="user_sex" label="性别"></el-table-column>
                        <el-table-column prop="user_iphone" label="手机号"></el-table-column>
                        <el-table-column prop="user_mail" label="邮箱"></el-table-column>
                        <el-table-column prop="user_age" label="年龄"></el-table-column>
                        <el-table-column prop="user_card" label="身份证"></el-table-column>
                        <el-table-column prop="user_address" label="地址"></el-table-column>
                        <el-table-column prop="user_word" label="工作单位"></el-table-column>
                        <el-table-column prop="teacher" label="是否老师"></el-table-column>
                        <el-table-column prop="whether" label="是否班主任"></el-table-column>
                        <el-table-column prop="creat_time" label="创建时间"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange1" layout="prev, pager, next" :total="total1"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="学生列表" name="student">
                    <el-table :data="tableData2" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="stu_number" label="学号" sortable width="120"></el-table-column>
                        <el-table-column prop="stu_sex" label="性别"></el-table-column>
                        <el-table-column prop="stu_age" label="年龄"></el-table-column>
                        <el-table-column prop="class_grade" label="年级"></el-table-column>
                        <el-table-column prop="class_name" label="班级"></el-table-column>
                        <el-table-column prop="stu_head" label="生活头像"><template slot-scope="scope"><img :src="scope.row.user_image" style="max-width:70px;max-height:70px;" /></template></el-table-column>
                        <el-table-column prop="stu_images1" label="人像1"><template slot-scope="scope"><img :src="scope.row.user_image" style="max-width:70px;max-height:70px;" /></template></el-table-column>
                        <el-table-column prop="stu_images2" label="人像2"><template slot-scope="scope"><img :src="scope.row.user_image" style="max-width:70px;max-height:70px;" /></template></el-table-column>
                        <el-table-column prop="user_openid" label="默认家长ID"></el-table-column>
                        <el-table-column prop="user_name" label="默认家长名"></el-table-column>
                        <el-table-column prop="user_iphone" label="默认家长手机"></el-table-column>
                        <el-table-column prop="creat_time" label="创建时间"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange2" layout="prev, pager, next" :total="total2"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="老师列表" name="teacher">
                     <el-table :data="tableData3" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="user_openid" label="用户ID" sortable width="120"></el-table-column>
                        <el-table-column prop="user_image" label="头像"><template slot-scope="scope"><img :src="scope.row.user_image" style="max-width:70px;max-height:70px;" /></template></el-table-column>
                        <el-table-column prop="user_alias" label="昵称"></el-table-column>
                        <el-table-column prop="user_name" label="名称"></el-table-column>
                        <el-table-column prop="user_sex" label="性别"></el-table-column>
                        <el-table-column prop="user_iphone" label="手机号"></el-table-column>
                        <el-table-column prop="user_mail" label="邮箱"></el-table-column>
                        <el-table-column prop="user_age" label="年龄"></el-table-column>
                        <el-table-column prop="user_card" label="身份证"></el-table-column>
                        <el-table-column prop="user_address" label="地址"></el-table-column>
                        <el-table-column prop="user_word" label="工作单位"></el-table-column>
                        <el-table-column prop="class_grade" label="年级"></el-table-column>
                        <el-table-column prop="class_name" label="班级"></el-table-column>
                        <el-table-column prop="work_number" label="工号"></el-table-column>
                        <el-table-column prop="subjects" label="学科"></el-table-column>
                        <el-table-column prop="user_image" label="人像1"><template slot-scope="scope"><img :src="scope.row.user_image" style="max-width:70px;max-height:70px;" /></template></el-table-column>
                        <el-table-column prop="user_image" label="人像2"><template slot-scope="scope"><img :src="scope.row.user_image" style="max-width:70px;max-height:70px;" /></template></el-table-column>
                        <el-table-column prop="whether" label="是否是班主任"></el-table-column>
                        <el-table-column prop="status" label="状态"></el-table-column>
                        <el-table-column prop="creat_time" label="创建时间"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange3" layout="prev, pager, next" :total="total3"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="访客列表" name="visitor">
                    <el-table :data="tableData4" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="visitor_id" label="访客ID" sortable></el-table-column>
                        <el-table-column prop="user_openid" label="用户ID"></el-table-column>
                        <el-table-column prop="user_name" label="名"></el-table-column>
                        <el-table-column prop="user_iphone" label="手机号"></el-table-column>
                        <el-table-column prop="visitor_head1" label="访客人像1"><template slot-scope="scope"><img :src="scope.row.user_image" style="max-width:70px;max-height:70px;" /></template></el-table-column>
                        <el-table-column prop="visitor_head2" label="访客人像2"><template slot-scope="scope"><img :src="scope.row.user_image" style="max-width:70px;max-height:70px;" /></template></el-table-column>
                        <el-table-column prop="visitor_time" label="访客时间"></el-table-column>
                        <el-table-column prop="visitor_butt" label="拜访人"></el-table-column>
                        <el-table-column prop="visitor_reason" label="拜访理由"></el-table-column>
                        <el-table-column prop="vistior_status" label="状态"></el-table-column>
                        <el-table-column prop="creat_time" label="创建时间"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange4" layout="prev, pager, next" :total="total4"></el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>

            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span> -->
        </el-dialog>

        <!-- 学校财务弹窗 -->
         <el-dialog title="财务管理" :visible.sync="financeVisible" width="90%">
            <el-tabs v-model="activeName1" @tab-click="handleClick">
                <el-tab-pane label="订单列表" name="list">
                    <el-table :data="tableData5" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="school_id" label="学校ID"></el-table-column>
                        <el-table-column prop="order_id" label="订单ID"></el-table-column>
                        <el-table-column prop="user_openid" label="用户ID" ></el-table-column>
                        <el-table-column prop="user_name" label="用户名" width="120"></el-table-column>
                        <el-table-column prop="goods_name" label="商品名称" sortable width="120"></el-table-column>
                        <el-table-column prop="goods_price" label="商品价格(￥)" width="100"></el-table-column>
                        <el-table-column prop="goods_times" label="商品时长(天)" width="100"></el-table-column>
                        <el-table-column prop="order_status" label="订单状态" width="100">
                            <template slot-scope="scope">
                                <span v-if = "scope.row.order_status == 1" class="green">已支付</span>
                                <!-- <span v-elif = "scope.row.order_status == 2">退款中</span>
                                <span v-elif = "scope.row.order_status == 3">退款成功</span> -->
                                <span v-elif = "scope.row.order_status == 0" class="red">未支付</span>
                            </template></el-table-column>
                        <el-table-column prop="creatime" label="创建时间" width="150"></el-table-column>
                    </el-table>
                    <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange5" layout="prev, pager, next" :total="total5"></el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="财务统计" name="summary">
                    <!-- <div class="schart">
                        <schart canvasId="bar" width="900" height="400" :data="schartData" type="bar" :options="options"></schart>
                    </div> -->
                    <el-table :data="tableData6" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="week" label="周总额"></el-table-column>
                        <el-table-column prop="month" label="月总额"></el-table-column>
                        <el-table-column prop="quarter" label="季度总额"></el-table-column>
                        <el-table-column prop="s_quarter" label="上一季度总额"></el-table-column>
                        <el-table-column prop="year" label="年总额"></el-table-column>
                    </el-table>
                </el-tab-pane>
                
            </el-tabs>
        </el-dialog>

    </div>
</template>

<script>
    let id, school_id , searchType = false;
    import Schart from 'vue-schart';
    export default {
        data() {
            return {
                tableData: [],//学校列表
                tableData1: [],//用户列表
                tableData2: [],//学生列表
                tableData3: [],//老师列表
                tableData4: [],//访客列表
                tableData5: [],//订单列表
                tableData6: [],//财务总结
                cur_page: 1,//学校分页
                cur_page1: 1,//用户分页
                cur_page2: 1,//学生分页
                cur_page3: 1,//老师分页
                cur_page4: 1,//访客分页
                cur_page5: 1,//订单分页
                total:0,//学校总数
                total1:0,//用户总数
                total2:0,//学生总数
                total3:0,//教师总数
                total4:0,//访客总数
                total5:0,//订单总数
                schoolCategory:[],//学校分类列表（用户搜索学校）
                schoolCategory1:[],//学校分类列表（用于添加学校）
                schartData:[],//学校财务总结
                options: {
                    title: '财务总结',
                    bgColor: '#009688',
                    titleColor: '#ffffff',
                    fillColor: '#e0f2f1',
                    axisColor: '#ffffff',
                    contentColor: '#999'
                },
                class_id:'',//学校类别ID
                editVisible: false,//是否显示学校编辑框
                delVisible: false,//是否显示删除提示框
                userVisible: false,//是否显示用户表弹出框
                financeVisible: false,//是否显示财务总结弹出框
                form: {},//添加学校编辑的内容
                activeName:'user',
                activeName1:'list',
                addsch:false,
                time: 500
            }
        },
        created() {
            this.getSchool();
            this.getSchoolCategory();
        },
        components: {
            Schart
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                if(searchType){
                    this.cur_page = val;
                    this.search();
                }else{
                    this.cur_page = val;
                    this.getSchool();
                }
            },
            // 分页导航
            handleCurrentChange1(val) {
                this.cur_page1 = val;
                this.getUserlist();
            },
            // 分页导航
            handleCurrentChange2(val) {
                this.cur_page2 = val;
                this.getStudentlist();
            },
            // 分页导航
            handleCurrentChange3(val) {
                this.cur_page3 = val;
                this.getTeacherlist();
            },
            // 分页导航
            handleCurrentChange4(val) {
                this.cur_page4 = val;
                this.getVisitorlist();
            },
            // 分页导航
            handleCurrentChange5(val) {
                this.cur_page5 = val;
                this.getOrderlist();
            },
            // 显示用户表弹出框
            showUser(index, row){
                school_id = row.school_id
                this.userVisible = true
                this.getUserlist(true);
                this.getStudentlist(true);
                this.getTeacherlist(true);
                this.getVisitorlist(true);
            },
            // 显示财务订单列表弹出框
            showFinance(index, row){
                school_id = row.school_id
                this.financeVisible = true
                this.getOrderlist(true);
                this.getFinancialSummary(true);
            },
            // 用户表头部导航点击
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 获取全部学校列表
            getSchool() {
                let that = this;
                $.ajax({  
                    type : "get",
                    url : json.https + "/school/select_school",
                    data:{
                        start:that.cur_page
                    },
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取全部学校列表返回')
                        console.log(res)
                         that.total = Number(res.totle)
                         that.tableData = res.data
                    }
                }); 
            },
            // 获取学校分类列表
            getSchoolCategory(type) {
                let that = this;
                if(type){
                    that.cur_page1 = 1;
                    that.total1 = 0
                }
                $.ajax({  
                    type : "get",
                    url : json.https + "/class/select_list",
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取学校分类列表返回')
                        console.log(res)
                         that.schoolCategory = res.data
                         that.schoolCategory1 = res.data
                    }
                }); 
            },
            // 根据分类搜索学校
            search(type){
                if(type){//点击搜索按钮搜索
                    this.cur_page = 1
                    this.total = 0
                }
                let that = this;
                if(that.class_id){
                    $.ajax({  
                        type : "get",
                        url : json.https + "/school/select_class_school",
                        data:{
                            class_id: that.class_id,
                            start: that.cur_page
                        },
                        success : function(res) {
                        console.log('根据分类搜索学校返回')
                        console.log(res)
                            that.total = Number(res.totle);
                            that.tableData = res.data
                        }
                    }); 
                }else{
                    that.$message.error('请选择学校分类');
                }
            },
            // 同步学校数据
            synchronous(index, row){
                let that = this;
                // 显示加载动画
                const loading = this.$loading({lock: true,text: '数据同步中',spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'});

                $.ajax({
                    type : "get",
                    url : json.https + "/dao/inser_user",
                    data:{
                        school_id: row.school_id
                    },
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('学校数据同步返回')
                        console.log(res)
                        if(res.code == 200){
                            loading.close();
                            that.getSchool();
                            that.$message.success('数据同步成功');
                        }else{
                             loading.close();
                            that.$message.error('数据同步失败');
                        }
                    }
                }); 
            },
            // 获取学校订单列表
            getOrderlist(type){
                let that = this;
                if(type){
                    that.cur_page5 = 1;
                    that.total5 = 0
                }
                $.ajax({
                    type : "get",
                    url : json.https + "/school/select_ord_b",
                    data:{
                        school_id: school_id,
                        start: that.cur_page5
                    },
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                    },
                    success : function(res) {
                        console.log('获取学校订单返回')
                        console.log(res)
                        if(res.code == 200){
                            that.total5 = Number(res.totle);
                            that.tableData5 = res.data
                        }
                    }
                }); 
            },
            // 获取学校用户列表
            getUserlist(type){
                let that = this;
                if(type){
                    that.cur_page1 = 1;
                    that.total1 = 0
                }
                $.ajax({
                    type : "get",
                    url : json.https + "/school/select_user_b",
                    data:{
                        school_id: school_id,
                        start: that.cur_page1
                    },
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取学校用户表返回')
                        console.log(res)
                        if(res.code == 200){
                            that.total1 = Number(res.msg);
                            that.tableData1 = res.data
                        }
                    }
                }); 
            },
            // 获取学校学生列表
            getStudentlist(type){
                let that = this;
                if(type){
                    that.cur_page2 = 1;
                    that.total2 = 0
                }
                $.ajax({
                    type : "get",
                    url : json.https + "/school/select_stu_b",
                    data:{
                        school_id: school_id,
                        start: that.cur_page2
                    },
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取学校学生表返回')
                        console.log(res)
                        if(res.code == 200){
                            that.total2 = Number(res.msg);
                            that.tableData2 = res.data
                        }
                    }
                }); 
            },
            // 获取学校教师列表
            getTeacherlist(type){
                let that = this;
                if(type){
                    that.cur_page3 = 1;
                    that.total3 = 0
                }
                $.ajax({
                    type : "get",
                    url : json.https + "/school/select_tea_b",
                    data:{
                        school_id: school_id,
                        start: that.cur_page3
                    },
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取学校教师表返回')
                        console.log(res)
                        if(res.code == 200){
                            that.total3 = Number(res.msg);
                            that.tableData3 = res.data
                        }
                    }
                }); 
            },
            // 获取学校访客列表
            getVisitorlist(type){
                let that = this;
                if(type){
                    that.cur_page4 = 1;
                    that.total4 = 0
                }
                $.ajax({
                    type : "get",
                    url : json.https + "/school/select_vis_b",
                    data:{
                        school_id: school_id,
                        start: that.cur_page4
                    },
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取学校访客表返回')
                        console.log(res)
                        if(res.code == 200){
                            that.total4 = Number(res.msg);
                            that.tableData4 = res.data
                        }
                    }
                }); 
            },
            // 获取学校财务总结
            getFinancialSummary(){
                let that = this;
                $.ajax({
                    type : "get",
                    url : json.https + "/report/school_report",
                    data:{
                        school_id: school_id
                    },
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log('获取学校财务总结返回')
                        console.log(res)
                        if(res.code == 200){
                            that.tableData6 = [res.data]
                            // that.schartData = [
                            //     {name:'周总额',value:res.data.week},
                            //     {name:'月总额',value:res.data.month},
                            //     {name:'季度总额',value:res.data.quarter},
                            //     {name:'年总额',value:res.data.year},
                            //     {name:'上一季度总额',value:res.data.s_quarter}
                            // ]
                        }
                    }
                }); 
            },
            // 显示添加学校编辑框
            handleAdd(index, row) {
                if(row){//修改学校信息
                    this.form = row
                    this.addsch = false
                }else{//添加学校信息
                    this.form = {
                        school_id: '',
                        school_name: '',
                        domain_name:'',
                        jump:'',
                        class_id:''
                    }
                    this.addsch = true
                }
                // this.idx = index;
                // const item = this.tableData[index];

                this.editVisible = true;
            },
            // 显示删除提示框
            handleDelete(index, row) {
                id = row.id
                this.idx = index;
                this.delVisible = true;
            },
            // 添加学校
            saveEdit() {
                let that = this;
                    if(that.addsch){//添加学校
                        if(that.form.class_id && that.form.school_id && that.form.school_name && that.form.domain_name && that.form.jump){
                            $.ajax({
                                type : "post",
                                url : json.https + "/school/insert_school",
                                data: that.form,
                                headers:{
                                    // Token:sessionStorage.getItem('face_token'),
                                    "content-type": "application/x-www-form-urlencoded"
                                    // "content-type": "application/json; charset=UTF-8"
                                },
                                success : function(res) {
                                console.log('添加学校返回')
                                console.log(res)
                                    if(res.code == 200){
                                        that.getSchool();
                                        that.editVisible = false;
                                        that.$message.success('添加成功');
                                    }else{
                                         that.$message.error(res.error);
                                    }
                                }
                            }); 
                        }else{
                            that.$message.error('请完善信息！');
                        }
                        
                    }else{//修改学校
                        if(that.form.school_id && that.form.school_name && that.form.domain_name && that.form.jump){
                            $.ajax({  
                                type : "put",
                                url : json.https + "/school/update_school",
                                data: that.form,
                                headers:{
                                    // Token:sessionStorage.getItem('face_token'),
                                    "content-type": "application/x-www-form-urlencoded"
                                    // "content-type": "application/json; charset=UTF-8"
                                },
                                success : function(res) {
                                console.log('修改学校返回')
                                console.log(res)
                                    if(res.code == 200){
                                        that.getSchool();
                                        that.editVisible = false;
                                        that.$message.success('修改成功');
                                    }else{
                                         that.$message.error(res.error);
                                    }
                                }
                            }); 
                        }else{
                            that.$message.error('请完善信息！');
                        }
                    }
            },
            // 跳转子后台
            toLogin(index, row){
                if(row.jump){
                    window.open(row.jump)
                }else{
                    this.$message.error('请添加子后台地址！');
                }
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

  
</style>
