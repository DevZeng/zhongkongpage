<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-tickets"></i> 服务商品管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="delete" class="handle-del mr10" @click="addGoods">添加商品</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="goods_id" label="商品ID" width="150"></el-table-column>
                <el-table-column prop="goods_name" label="商品名称" sortable width="120"></el-table-column>
                <el-table-column prop="goods_price" label="商品价格(单位：￥)"></el-table-column>
                <el-table-column prop="goods_times" label="商品时长(单位：天)"></el-table-column>
                <el-table-column prop="introduce" label="商品描述"></el-table-column>
                <el-table-column prop="creatime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="180">
                    <template slot-scope="scope">
                        <el-button size="small" type="danger" @click="deleteGoods(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="商品编辑" :visible.sync="editVisible" width="700px">
            <el-form ref="form" :model="form" label-width="150px">
                <el-form-item label="商品名">
                    <el-input v-model="form.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格">
                    <el-input v-model="form.goods_price" placeholder="单位：￥"></el-input>
                </el-form-item>
                <el-form-item label="商品时长">
                    <el-input v-model="form.goods_times" placeholder="单位：天"></el-input>
                </el-form-item>
                <el-form-item label="商品描述">
                    <el-input v-model="form.introduce"></el-input>
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
    let goods_id;
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
                form: {},
                idx: -1,
                total:0
            }
        },
        created() {
            this.getData();
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
            // 获取服务商品列表
            getData() {
                let that = this;
                $.ajax({  
                    type : "get",
                    url : json.https + "/goods/select_all_goods",
                    headers:{
                        Token:sessionStorage.getItem('face_token'),
                        // "content-type": "application/x-www-form-urlencoded"
                    },
                    success : function(res) {
                        console.log(res)
                         that.tableData = res.data
                    }
                }); 
            },
            // 显示商品编辑弹窗框
            addGoods(index, row) {
                this.form= {
                    goods_name: '',
                    goods_price: '',
                    goods_times: '',
                    introduce:''
                },
                this.editVisible = true;
            },
            // 显示删除确认框
            deleteGoods(index, row) {
                goods_id = row.goods_id
                this.idx = index;
                this.delVisible = true;
            },
            // 添加商品
            saveEdit() {
                let that = this;
                console.log(that.form)
                if(that.form.goods_name && that.form.goods_price && that.form.goods_times && that.form.introduce){
                    $.ajax({  
                        type : "post",
                        url : json.https + "/goods/insert_goods",
                        data: that.form,
                        headers:{
                            Token:sessionStorage.getItem('face_token'),
                            "content-type": "application/x-www-form-urlencoded"
                            // "content-type": "application/json; charset=UTF-8"
                        },
                        success : function(res) {
                            console.log(res)
                            if(res.sucesss){
                                that.getData();
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
                 
            },
            // 删除商品
            deleteRow(){
                console.log(goods_id)
                let that = this;
                $.ajax({  
                    type : "delete",
                    url : json.https + "/goods/delete_goods/" + goods_id,
                    headers:{
                        Token: sessionStorage.getItem('face_token')
                    },
                    success : function(res) {
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
