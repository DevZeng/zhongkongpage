<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 包管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
            

        <div class="container">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="功能分类管理" name="grade">
                    <div class="handle-box">
                        <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd1">添加功能分类</el-button>
                    </div>
                    <el-table :data="gradeList" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="id" label="ID" width="150"></el-table-column>
                        <el-table-column prop="main_name" label="分类名称" width="120"></el-table-column>
                        <el-table-column prop="creatime" label="更新时间" sortable></el-table-column>
                       <!--  <el-table-column label="操作" width="280">
                            <template slot-scope="scope">
                                <el-button size="small" type="danger" @click="handleDelete3(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column> -->
                    </el-table>
                     <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="设备分类管理" name="class">
                    <div class="handle-box">
                        <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd2">添加设备分类</el-button>
                        <el-select v-model="select_cate" placeholder="选择功能分类" class="handle-select mr10">
                            <el-option v-for="(item,index) in gradeList" :key="index" :label="item.main_name" :value="item.id"></el-option>
                        </el-select>
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </div>
                    <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="id" label="功能分类ID" width="150"></el-table-column>
                        <el-table-column prop="two_id" label="设备分类ID" width="120"></el-table-column>
                        <el-table-column prop="two_name" label="设备分类名称"></el-table-column>
                        <el-table-column prop="creatime" label="创建时间" sortable></el-table-column>
                        <el-table-column fixed="right" label="操作" width="180">
                            <template slot-scope="scope">
                                <el-button size="small" type="primary" @click="handleAdd3(scope.$index, scope.row)">修改包</el-button>
                                <el-button size="small" type="primary" @click="handleShow1(scope.$index, scope.row)">查看包</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                     <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!-- 添加年级弹出框 -->
        <el-dialog title="添加年级" :visible.sync="AddVisible1" width="40%">
            <el-form ref="form1" :model="form1" label-width="120px">
                <el-form-item label="功能分类名称">
                    <el-input v-model="form1.main_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="AddVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="AddGrade">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 添加班级弹出框 -->
        <el-dialog title="添加" :visible.sync="AddVisible2" width="30%">
            <el-form ref="form2" :model="form2" label-width="120px">
                <el-form-item label="功能分类">
                    <el-select v-model="form2.id" placeholder="选择功能分类" class="handle-select mr10">
                        <el-option v-for="(item,index) in gradeList" :key="index" :label="item.main_name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item label="设备分类名称">
                    <el-input class="handle-select mr10" v-model="form2.two_name"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="AddVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="AddClass">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改添加包弹出框 -->
        <el-dialog title="包管理" :visible.sync="AddVisible3" width="30%">
            <el-form ref="form3" :model="form3" label-width="120px">
                <el-form-item label="包地址">
                    <!-- <el-input v-model="form3.apk_address" placeholder="请填写学生学号"></el-input> -->
                    <el-upload
                        class="upload-demo"
                        :action="url"
                        :on-remove="Remove"
                        :on-success="Rsuccess"
                        :on-exceed='Overrun'
                        multiple
                        :limit="1"
                        :file-list="form3.apk_url">
                      <el-button size="small" type="primary">点击上传</el-button>
                    </el-upload>

                </el-form-item>
                <el-form-item label="包版本号">
                    <el-input v-model="form3.apk_edition" placeholder="请填写版本号"></el-input>
                </el-form-item>
                <!-- <el-form-item label="域名信息">
                    <el-input v-model="form3.domain_name" placeholder="请填写域名信息"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="AddVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="Addpackage">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 学生信息弹出框 -->
        <el-dialog title="包信息" :visible.sync="ShowVisible1" width="70%">
            <el-form ref="form4" :model="form4" label-width="80px">
                <el-form-item label="包地址"><span v-text="form4.apk_address"></span></el-form-item>
                <el-form-item label="包版本号"><span v-text="form4.apk_edition"></span></el-form-item>
                <!-- <el-form-item label="域名信息"><span v-text="form4.domain_name"></span></el-form-item> -->
                <el-form-item label="更新时间"><span v-text="form4.upatetime"></span></el-form-item>
            </el-form>
        </el-dialog>

        <!-- 删除班级提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible1" width="300px" center>
            <div class="del-dialog-cnt">删除班级并将该班级学生从班级移出，删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 移除学生提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible2" width="300px" center>
            <div class="del-dialog-cnt">是否将该学生从班级内移除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="removeStudent">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 移除教师提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible4" width="300px" center>
            <div class="del-dialog-cnt">是否删除该老师的所有信息？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="removeTeacher">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除年级提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible3" width="300px" center>
            <div class="del-dialog-cnt">是否将该年级删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow1">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    let class_id, grade_id, stu_number, user_id;
    export default {
        data() {
            return {
                url: json.https + "/txUpload_t",
                tableData: [],
                gradeList: [],
                form1: [],
                form2: [],
                form3: [{apk_url:[]}],
                form4: [],
                form5: [],
                cur_page: 1,
                select_cate: '',
                AddVisible1: false,
                AddVisible2: false,
                AddVisible3: false,
                delVisible1: false,
                delVisible2: false,
                delVisible3: false,
                delVisible4: false,
                ShowVisible1: false,
                ShowVisible2: false,
                idx: -1,
                idx1: -1,
                total:0,
                activeName:'grade',
            }
        },
        created() {
            // this.getData();
            this.getGrade();
        },
        methods: {
            // 头部导航点击
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 显示添加年级弹框
             handleAdd1() {
                this.form1= {
                    main_name: ''
                },
                this.AddVisible1 = true;
            },
            // 显示添加设备分类弹框
            handleAdd2() {
                this.form2= {
                    id: '',
                    two_name:''
                },
                this.AddVisible2 = true;
            },
            // 显示修改包（添加包）弹框
            handleAdd3(index, row) {
                this.form3 = {
                    apk_url:[],
                    two_id: '',
                    domain_name:''
                }
                this.AddVisible3 = true;
                let that = this
                 $.ajax({
                    type : "get",
                    url : json.https + "/select_apk",
                    data:{
                        two_id: row.two_id
                    },
                    success : function(res) {
                        console.log('获取包信息返回')
                        console.log(res)
                        if( res.data.length > 0){
                            res.data[0].apk_url = [{
                                url: res.data[0].apk_address,
                                name: res.data[0].apk_edition + '.apk'
                            }]
                        }else{
                            res.data = [{
                                apk_url: [],
                                two_id: row.two_id,
                                domain_name:'moren'
                            }]
                        }

                        that.form3 = res.data[0]
                    }
                }); 
            },
            // 获取班级学生(显示班级学生列表)
            handleShow1(index, row){
                this.form4 = {
                    apk_address: '',
                    apk_edition: '',
                    domain_name: '',
                    upatetime: ''
                }
                this.ShowVisible1 = true;
                let that = this;
                $.ajax({
                    type : "get",
                    url : json.https + "/select_apk",
                    data:{
                        two_id: row.two_id
                    },
                    success : function(res) {
                        console.log('获取包信息返回')
                        console.log(res)
                       if( res.data.length == 0){
                            res.data = [{
                                apk_address: '无',
                                apk_edition: '无',
                                domain_name: '无',
                                upatetime: '无'
                            }]
                        }
                        that.form4 = res.data[0]
                    }
                }); 
            },
            // 获取班级教师(显示班级教师列表)
            handleShow2(cl_id){
                this.ShowVisible2 = true;
                let that = this;
                $.ajax({
                    type : "get",
                    url : json.https + "/user/select_c_all_apply",
                    data:{
                        class_id: cl_id
                    },
                    headers:{
                        Token: sessionStorage.getItem('face_token'),
                    },
                    success : function(res) {
                        console.log('班级教师列表')
                        console.log(res)
                        that.form5 = res.data
                    }
                }); 
            },
            // 显示删除班级弹框
            handleDelete1(index, row) {
                class_id = row.class_id
                this.idx = index;
                this.delVisible1 = true;
            },
            // 移除单个学生
            handleDelete2(index, row){
                class_id = row.class_id
                stu_number = row.stu_number
                this.delVisible2 = true;
            },
            // 显示删除年级弹框
            handleDelete3(index, row) {
                grade_id = row.id
                this.idx1 = index;
                this.delVisible3 = true;
            },
            // 移除教师
            handleDelete4(index, row){
                class_id = row.class_id
                user_id = row.user_id
                this.delVisible4 = true;
            },
            // 获取所有班级列表
            getData() {
                let that = this;
                $.ajax({  
                    type : "get",
                    url : json.https + "/class/select_all_class",
                    data:{
                        start: that.cur_page
                    },
                    success : function(res) {
                        console.log('班级列表')
                        console.log(res)
                        that.total = res.total;
                        that.tableData = res.data
                    }
                }); 
            },
            // 获取功能分类列表
            getGrade(){
                let that = this;
                $.ajax({  
                    type : "get",
                    url : json.https + "/select_main",
                    success : function(res) {
                        console.log('功能分类列表')
                        console.log(res)
                        that.gradeList = res.data
                    }
                }); 
            },
            // 根据功能分类搜索设备分类
            search(){
                let that = this;
                if(that.select_cate){
                    console.log(that.select_cate)
                    $.ajax({  
                        type : "get",
                        url : json.https + "/select_two",
                        data:{
                            id: that.select_cate
                        },
                        success : function(res) {
                        console.log('根据功能分类搜索设备分类返回')
                        console.log(res)
                            that.total = 0;
                            that.tableData = res.data
                        }
                    }); 
                }else{
                    that.$message.error('请选择年级');
                }
            },
            // 添加功能分类
            AddGrade(){
               let that = this;
                if(that.form1.main_name){
                    console.log(that.form1.main_name)
                    $.ajax({  
                        type : "post",
                        url : json.https + "/insert_main",
                        data:{
                            main_name: that.form1.main_name
                        },
                        headers:{
                            "content-type": "application/x-www-form-urlencoded"
                        },
                        success : function(res) {
                        console.log('添加功能分类返回')
                        console.log(res)
                            if(res.code == 200){
                                that.$message.success('添加成功');
                                that.getGrade();
                                that.AddVisible1 = false;
                            }else{
                                that.$message.error(res.error);
                            }
                           
                        }
                    }); 
                }else{
                    that.$message.error('请填写信息');
                }
            },
            // 添加班级
            AddClass() {
               let that = this;
                if(that.form2.id && that.form2.two_name){
                    console.log(that.form2.id)
                    console.log(that.form2.two_name)
                    $.ajax({  
                        type : "post",
                        url : json.https + "/insert_two",
                        data:that.form2,
                        headers:{
                             "content-type": "application/x-www-form-urlencoded"
                            // "content-type": "application/json; charset=UTF-8"
                        },
                        success : function(res) {
                        console.log('添加设备分类返回')
                        console.log(res)
                            if(res.code == 200){
                                that.getData();
                                that.$message.success('添加成功');
                                that.AddVisible2 = false;
                            }else{
                                that.$message.error(res.error);
                            }
                        }
                    }); 
                }else{
                    that.$message.error('请填写信息');
                }
            },
            // 添加修改包信息
            Addpackage() {
                let that = this;
                if(that.form3.apk_url && that.form3.domain_name && that.form3.apk_edition){
                    console.log(that.form3.apk_url)
                    console.log(that.form3.domain_name)
                    console.log(that.form3.apk_edition)
                    var data = that.form3
                    data.apk_address = data.apk_url[0].url
                    console.log(that.form3)
                    console.log(data)
                    if(data.id){//修改包信息
                        $.ajax({
                            type : "put",
                            url : json.https + "/update_apk",
                            data: data,
                            headers:{
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success : function(res) {
                            console.log('修改包信息返回')
                            console.log(res)
                                if(res.code == 200){
                                    that.$message.success('修改成功');
                                    that.AddVisible3 = false;
                                }else{
                                    that.$message.error(res.msg);
                                }
                            }
                        }); 
                    }else{//添加包信息
                         $.ajax({  
                            type : "post",
                            url : json.https + "/insert_apk",
                            data: data,
                            headers:{
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success : function(res) {
                            console.log('添加信息返回')
                            console.log(res)
                                if(res.code == 200){
                                    that.$message.success('添加成功');
                                    that.AddVisible3 = false;
                                }else{
                                    that.$message.error(res.msg);
                                }
                            }
                        }); 
                    }
                    
                }else{
                    that.$message.error('请填写信息');
                }
            },
            // 移除单个学生
            removeStudent(){
                let that = this;
                $.ajax({  
                    type : "delete",
                    url : json.https + "/class_m/delete_stu/" + stu_number,
                    headers:{
                        Token: sessionStorage.getItem('face_token')
                    },
                    success : function(res) {
                        console.log('移除学生返回')
                        console.log(res)
                        if(res.code == 200){
                            that.handleShow1(class_id)
                            that.$message.success('移除成功');
                            that.delVisible2 = false;
                        }else{
                             that.$message.error(res.msg);
                        }
                    }
                }); 
            },
            // 删除教师信息
            removeTeacher(){
                let that = this;
                $.ajax({  
                    type : "delete",
                    url : json.https + "/user/delete_ter/" + user_id,
                    headers:{
                        Token: sessionStorage.getItem('face_token')
                    },
                    success : function(res) {
                        console.log('删除教师信息返回')
                        console.log(res)
                        if(res.sucesss){
                            that.handleShow2(class_id)
                            that.$message.success('删除成功');
                            that.delVisible4 = false;
                        }else{
                             that.$message.error(res.msg);
                        }
                    }
                }); 
            },
            // 确定删除班级
            deleteRow(){
                console.log(class_id)
                let that = this;
                $.ajax({  
                    type : "delete",
                    url : json.https + "/class/delete_class/" + class_id,
                    headers:{
                        Token: sessionStorage.getItem('face_token')
                    },
                    success : function(res) {
                        console.log('删除班级返回')
                        console.log(res)
                        if(res.sucesss){
                            that.tableData.splice(that.idx, 1);
                            that.$message.success('删除成功');
                            that.delVisible1 = false;
                        }else{
                             that.$message.error(res.error);
                        }
                    }
                }); 
            },
           // 确定删除年级
            deleteRow1(){
                console.log(grade_id)
                let that = this;
                $.ajax({  
                    type : "delete",
                    url : json.https + "/class/delete_grade/" + grade_id,
                    headers:{
                        Token: sessionStorage.getItem('face_token')
                    },
                    success : function(res) {
                        console.log('删除年级返回')
                        console.log(res)
                        if(res.sucesss){
                            that.tableData.splice(that.idx1, 1);
                            that.getGrade();
                            that.$message.success('删除成功');
                            that.delVisible3 = false;
                        }else{
                             that.$message.error(res.error);
                        }
                    }
                }); 
            },

            // 上传文件返回
            Rsuccess(response, file, fileList){
                // console.log(response)
                // console.log(file)
                console.log(file)
                // if()
                this.form3.apk_url = [{
                    name: file.name,
                    url: file.response.msg
                }]
            },
            // 文件上传超限
            Overrun(files, fileList){
               this.$message.error('只能上传一个文件');
            },
            // 文件移除
            Remove(file, fileList){
                console.log(file)
                this.form3.apk_url = []
            },
            // 清空上传的列表
            clearFiles(){
                 this.$refs.upload.clearFiles();
            },
        }
    }

</script>

<style>
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
    .el-upload {
        border: none !important;
        width: auto !important;
        height: auto !important;
    }
</style>
