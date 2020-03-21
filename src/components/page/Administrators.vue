<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 管理员管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="handleAdd">添加管理员</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="ID" sortable width="150"></el-table-column>
                <el-table-column prop="user_name" label="用户名称"></el-table-column>
                <el-table-column prop="user_iphone" label="电话"></el-table-column>
                <!-- <el-table-column prop="user_pwd" label="密码"></el-table-column> -->
                <el-table-column prop="creatime" label="创建时间"></el-table-column>
                <el-table-column fixed="right" label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.user_iphone != username" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="50px">
                <el-form-item label="姓名">
                    <el-input v-model="form.user_name"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="form.user_iphone"></el-input>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.user_pwd"></el-input>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="deleteRow">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    let id;
    export default {
        data() {
            return {
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                editVisible: false,
                delVisible: false,
                form: {
                    user_iphone: '',
                    user_name: '',
                    user_pwd: ''
                },
                idx: -1,
                total:0,
                username:''
            }
        },
        created() {
            this.getData();
            this.username = localStorage.getItem('faceA_username');
        },
        computed: {
            data() {
                return this.tableData.filter((d) => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取管理员账号列表
            getData() {
                let that = this;
                $.ajax({  
                    type : "get",
                    url : json.https + "/login/select_all_login",
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log(res)
                         that.tableData = res.data
                    }
                }); 
            },
            handleAdd(index, row) {
                this.idx = index;
                const item = this.tableData[index];
                this.form= {
                    user_iphone: '',
                    user_name: '',
                    user_pwd: ''
                },
                this.editVisible = true;
            },
            handleDelete(index, row) {
                id = row.id
                this.idx = index;
                this.delVisible = true;
            },
            // 添加管理员
            saveEdit() {
                let that = this;
                 $.ajax({  
                    type : "post",
                    url : json.https + "/login/insert_login",
                    data: JSON.stringify(that.form),
                    headers:{
                        // Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                        "content-type": "application/json; charset=UTF-8"
                    },
                    success : function(res) {
                        console.log(res)
                        if(res.code == 200){
                            that.getData();
                            that.editVisible = false;
                            that.$message.success('添加成功');
                        }else{
                             that.$message.error(res.error);
                        }
                    }
                }); 
            },
            // 确定删除
            deleteRow(){
                console.log(id)
                let that = this;
                $.ajax({  
                    type : "delete",
                    url : json.https + "/login/delete_login/" + id,
                    headers:{
                        // Token: sessionStorage.getItem('face_token')
                    },
                    success : function(res) {
                        console.log(res)
                        if(res.code == 200){
                            that.tableData.splice(that.idx, 1);
                            that.$message.success('删除成功');
                            that.delVisible = false;
                        }else{
                             that.$message.error(res.error);
                        }
                    }
                }); 
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
