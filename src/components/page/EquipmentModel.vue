<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 设备管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">



            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="设备型号" name="equipment">
                     <div class="handle-box">
                        <!-- <el-button type="primary" icon="delete" class="handle-del mr10" @click="showEdit">添加型号</el-button> -->
                    </div>
                    <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                        <el-table-column type="selection" width="55"></el-table-column>
                        <el-table-column prop="version_id" label="型号ID" sortable ></el-table-column>
                        <el-table-column prop="version_name" label="型号名称" ></el-table-column>
                        <el-table-column prop="remarks" label="描述"></el-table-column>
                        <!-- <el-table-column prop="images" label="图片" width="200"><template slot-scope="scope"><img :src="scope.row.images" style="max-width:200px;max-height:120px;" /></template></el-table-column> -->
                        <!-- <el-table-column prop="creatime" label="更新时间"></el-table-column> -->
                        <el-table-column fixed="right" label="操作" width="250">
                            <template slot-scope="scope">
                                <el-button size="small" type="primary" @click="showEdit1(scope.$index, scope.row)">添加款式</el-button>
                                <el-button size="small" type="primary" @click="showEdit2(scope.$index, scope.row)">查看详情</el-button>
                                <!-- <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button> -->
                            </template>
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="设备定位" name="record">
                    <div class="handle-box">
                        <el-input v-model="select_word" placeholder="输入设备ID" class="handle-input mr10"></el-input>
                        <el-button type="primary" icon="search" @click="search">搜索</el-button>
                    </div>
                    <el-table :data="tableData1" border style="width: 100%" ref="multipleTable">
                        <el-table-column prop="device_id" label="设备ID" sortable width="150"></el-table-column>
                        <el-table-column prop="battery" label="电量" width="150"></el-table-column>
                        <el-table-column prop="address" label="定位地址"></el-table-column>
                        <el-table-column prop="lag" label="经度" width="150"></el-table-column>
                        <el-table-column prop="lat" label="纬度" width="150"></el-table-column>
                        <el-table-column prop="time_text" label="定位时间" width="180"></el-table-column>
                        <!-- <el-table-column prop="cteation_time" label="更新时间" width="200"></el-table-column> -->
                    </el-table>
                    <div class="pagination">
                        <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
                        </el-pagination>
                    </div>
                </el-tab-pane>
            </el-tabs>







            <!-- <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="showEdit">添加型号</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="version_id" label="型号ID" sortable width="150"></el-table-column>
                <el-table-column prop="version_name" label="型号名称" width="200"></el-table-column>
                <el-table-column prop="remarks" label="描述"></el-table-column>
                <el-table-column prop="creatime" label="更新时间" width="200"></el-table-column>
                <el-table-column label="操作" width="350">
                    <template slot-scope="scope">
                        <el-button size="small" type="primary" @click="showEdit1(scope.$index, scope.row)">添加颜色</el-button>
                        <el-button size="small" type="primary" @click="showEdit2(scope.$index, scope.row)">查看详情</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table> -->
        </div>

        <!-- 型号编辑弹出框 -->
        <el-dialog title="添加型号" :visible.sync="editVisible" width="40%">
             <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="型号名称">
                    <el-input v-model="form.version_name"></el-input>
                </el-form-item>
                <el-form-item label="型号描述">
                    <el-input v-model="form.remarks"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 颜色编辑弹出框 -->
        <el-dialog title="添加型号款式" :visible.sync="editVisible1" width="40%">
            <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="款式名称">
                    <el-input v-model="form1.color"></el-input>
                </el-form-item>
                <el-form-item label="款式图片">
                    <el-upload
                        ref="upload"
                        class="upload-demo"
                        drag
                        :action="url"
                        :limit=1
                        :on-remove="Remove"
                        :on-success="Rsuccess"
                        :on-exceed='Overrun'>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb，图片宽高比例5:3</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="submit1">确 定</el-button>
            </span>
        </el-dialog>


        <!-- 型号详情弹出框 -->
        <el-dialog title="详情" :visible.sync="detailsVisible" width="70%">
            <el-table :data="form2" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="version_id" label="型号ID" sortable width="150"></el-table-column>
                <el-table-column prop="version_name" label="型号名称" width="150"></el-table-column>
                <el-table-column prop="colour_id" label="款式ID" width="150"></el-table-column>
                <el-table-column prop="colour" label="款式名" width="150"></el-table-column>
                <el-table-column prop="picture" label="款式图片"><template slot-scope="scope"><img :src="scope.row.picture" style="max-width:200px;max-height:120px;" /></template></el-table-column>
                <el-table-column prop="creatime" label="更新时间" width="200"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="handleDelete1(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- <el-form ref="form2" :model="form2" label-width="150px">
                <el-form-item label="型号名称：">
                    <span>{{form2.version_name}}</span>
                </el-form-item>
                <el-form-item label="型号描述：">
                    <span>{{form2.remarks}}</span>
                </el-form-item>
                <el-form-item label="型号款式：">
                    <div v-for="item in colorPictrue">
                        <img :src="item.colorPictrue">
                    </div>
                </el-form-item>
            </el-form> -->
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible1" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow1">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import VueCropper  from 'vue-cropperjs';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    let addState = false,
    version_id,
    picture_id,
    imgfile;
    export default {
        data() {
            return {
                url: json.https + "/txUpload_t",
                tableData: [],
                tableData1:[],
                cur_page: 1,
                cur_page1:1,
                class_id:'',
                select_word:'',
                editVisible: false,
                editVisible1: false,
                detailsVisible:false,
                delVisible: false,
                delVisible1:false,
                classList:[],
                form: {},
                form1:{},
                form2:[],
                idx: -1,
                total:0,
                total1:0,
                activeName:'equipment',

                fileList: [],
                imgSrc: ''            
            }
        },
        created() {
            console.log('11111111111111111111111111')
            this.getData();
        },
        components: {
            quillEditor
        },
        methods: {
            // 头部导航点击
            handleClick(tab, event) {
                console.log(tab, event);
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page1 = val;
                this.search();
            },
            // 获取设备型号列表
            getData() {
                let that = this;
                $.ajax({  
                    type : "get",
                    url : json.https + "/device/select_all_version", 
                    success : function(res) {
                        console.log('获取设备型号列表返回')
                        console.log(res)
                        if(res.data){
                            that.tableData = res.data
                        }
                    }
                }); 
            },
            // 显示删除提示框
            handleDelete(index, row) {
                console.log(row.version_id)
                version_id = row.version_id
                this.idx = index;
                this.delVisible = true;
            },
            handleDelete1(index, row) {
                console.log(row.picture_id)
                picture_id = row.picture_id
                this.delVisible1 = true;
            },
            // 显示型号编辑框
            showEdit() {
                 this.editVisible = true;
                 this.form = {
                    version_name:'',
                    remarks:'',
                    images:'1'
                 }
            },
            // 显示颜色编辑框
            showEdit1(index, row) {
                this.form1 = {
                    version_id: row.version_id,
                    color: '',
                    picture: [],
                },
                this.editVisible1 = true;
            },
            // 显示型号详情
            showEdit2(index, row) {
                version_id = row.version_id
                this.detailsVisible = true;
                this.getColor();

            },
             // 搜索定位信息
            search(){
                let that = this;
                if(this.select_word){
                    $.ajax({  
                        type : "get",
                        url : json.https + "/device/select_adress",  
                        data:{
                            device_id: that.select_word,
                            start:that.cur_page1
                        },
                        success : function(res) {
                            console.log('搜索设备定位信息返回')
                            console.log(res)
                            for(let i = 0; i < res.data.length; i++){
                                let time = new Date(res.data[i].location_time*1000);
                                let year = time.getFullYear();
                                let month = time.getMonth() + 1;
                                let date = time.getDate();
                                let hours = time.getHours();
                                let minutes = time.getMinutes();
                                let seconds = time.getSeconds();
                                res.data[i].time_text = year + "-" + (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date) + ' ' + (hours < 10 ? "0" + hours : hours) + ":" + (minutes < 10 ? "0" + minutes : minutes) + ":" + (seconds < 10 ? "0" + seconds : seconds);//例：2018-12-5 12：00：00
                            }
                            that.tableData1 = res.data;
                            that.totle1 = res.totle;
                        }
                    }); 
                }
            },
            // 获取型号款式图片
            getColor(){
                let that = this;
                $.ajax({  
                    type : "get",
                    url : json.https + "/device/select_all_picture",
                    data:{
                        version_id:version_id
                    },
                    success : function(res) {
                        console.log('型号款式图片返回')
                        console.log(res)
                        if(res.data){
                            that.form2 = res.data
                        }else{
                            that.$message.error(res.error);
                        }
                    }
                }); 
            },
            // 删除型号
            deleteRow(){
                console.log(version_id)
                let that = this;
                $.ajax({  
                    type : "delete",
                    url : json.https + "/device/delete_version/" + version_id,
                    headers:{
                        // Token:sessionStorage.getItem('face_token')
                    },
                    success : function(res) {
                        console.log('删除型号返回')
                        console.log(res)
                        if(res.sucesss){
                            that.tableData.splice(that.idx, 1);
                            that.$message.success('删除成功');
                            that.delVisible = false;
                        }else{
                             that.$message.error(res.error);
                        }
                    }
                }); 
            },
            // 添加型号
            submit(){
                let that = this;
                console.log(that.form)
                if( that.form.version_name && that.form.remarks){
                        $.ajax({  
                            type : "POST",
                            url : json.https + "/device/insert_version",
                            data:that.form,
                            headers:{
                                // Token:sessionStorage.getItem('face_token'),
                                // "content-type": "application/json; charset=UTF-8"
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success : function(res) {
                                console.log('添加型号返回')
                                console.log(res)
                                if(res.sucesss){
                                    that.getData();
                                    that.$message.success('保存成功！');
                                    that.editVisible = false;
                                }else{
                                    that.$message.error('保存失败！');

                                }
                            }
                        }); 
                    
                }else{
                    that.$message.error('信息不完成整，无法保存！');
                }
            },
            // 添加型号款式
            submit1(){
                let that = this;
                console.log(that.form1)
                if( that.form1.color && that.form1.picture.length > 0){
                    console.log(that.form1)
                    let data = that.form1;
                    data.picture = data.picture[0].response.msg
                    console.log(data)
                        $.ajax({  
                            type : "POST",
                            url : json.https + "/device/insert_picture",
                            data: data,
                            headers:{
                                // Token:sessionStorage.getItem('face_token'),
                                // "content-type": "application/json; charset=UTF-8"
                                "content-type": "application/x-www-form-urlencoded"
                            },
                            success : function(res) {
                                console.log('添加型号款式返回')
                                console.log(res)
                                if(res.sucesss){
                                    that.getData();
                                    that.clearFiles();
                                    that.$message.success('保存成功！');
                                    that.editVisible1 = false;
                                }else{
                                    that.$message.error('保存失败！');
                                }
                            }
                        }); 
                }else{
                    that.$message.error('信息不完成整，无法保存！');
                }
            },
            // 删除型号款式图片
            deleteRow1(){
                let that = this;
                $.ajax({  
                    type : "delete",
                    url : json.https + "/device/detele_picture/" + picture_id,
                    headers:{
                        // Token:sessionStorage.getItem('face_token')
                    },
                    success : function(res) {
                        console.log('删除型号图片返回')
                        console.log(res)
                        if(res.sucesss){
                            that.$message.success('删除成功');
                            that.delVisible1 = false;
                            that.getColor();
                        }else{
                             that.$message.error(res.error);
                        }
                    }
                }); 
            },
            // 颜色图上传------------------------------------------------------
            // 上传图片成功返回
            Rsuccess(response, file, fileList){
                console.log('上传图片返回')
                console.log(fileList)
                this.form1.picture = fileList
            },
            // 图片上传超限
            Overrun(files, fileList){
               this.$message.error('只能上传一张图片');
            },
            // 图片移除
            Remove(file, fileList){
                console.log(fileList)
                this.form1.picture = []
            },
            // 清空上传的列表
            clearFiles(){
                 this.$refs.upload.clearFiles();
            },
        }
    }

</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 150px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }

    .editor-btn{
        margin-top: 20px;
    }
    h3{
        height:40px;
        line-height:40px;
    }
    input{
        width:97.8%;
        height:30px;
        padding:0 1%;
        border:1px solid #ccc;
    }
</style>
