<template>
    <div class="login-wrap">
        <div class="ms-title">图巴诺智能校园总控后台</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm()"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <!-- <p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p> -->
            </el-form>
        </div>
    </div>
</template>

<script>
    var base = new Base64();
    export default {
        data: function(){
            return {
                ruleForm: {
                    username: localStorage.getItem('faceA_username'),
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入手机号', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        created() {
            if(localStorage.getItem('face_password')){
                this.base.decode(localStorage.getItem('face_password'))
            }
        },
        methods: {
            submitForm() {
                let that = this;
                if(that.ruleForm.username && that.ruleForm.password){
                    console.log(that.ruleForm.username)
                    console.log(that.ruleForm.password)
                     $.ajax({  
                        type : "POST",
                        url : json.https + "/login/getPasswordByUsername",
                        data:{
                            username:  that.ruleForm.username,
                            password: that.ruleForm.password
                        },
                         headers:{
                             // "content-type": "application/json; charset=UTF-8"
                        "content-type": "application/x-www-form-urlencoded"
                        },
                        success : function(res) {
                            console.log(res)
                            // return;
                            if(res.code == 200){
                            localStorage.setItem('faceA_username',that.ruleForm.username);
                            localStorage.setItem('faceA_password',base.encode(that.ruleForm.password));
                            sessionStorage.setItem('faceA_token',res.message);
                             that.$router.push('/');
                            }else{
                                that.$message.error(res.msg);
                            }
                        }
                    }); 
                 }else{
                    that.$message.error('信息错误！');
                 }
               
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         localStorage.setItem('ms_username',this.ruleForm.username);
                //         this.$router.push('/');
                //     } else {
                //         console.log('error submit!!');
                //         return false;
                //     }
                // });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        background: #fff;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>