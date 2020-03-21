webpackJsonp([8],{"6oi0":function(t,e){},n3E3:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=void 0,o={data:function(){return{tableData:[],tableData1:[],tableData2:[],tableData3:[],tableData4:[],tableData5:[],tableData6:[],cur_page:1,cur_page1:1,cur_page2:1,cur_page3:1,cur_page4:1,cur_page5:1,total:0,total1:0,total2:0,total3:0,total4:0,total5:0,schoolCategory:[],schoolCategory1:[],schartData:[],options:{title:"财务总结",bgColor:"#009688",titleColor:"#ffffff",fillColor:"#e0f2f1",axisColor:"#ffffff",contentColor:"#999"},class_id:"",editVisible:!1,delVisible:!1,userVisible:!1,financeVisible:!1,form:{},activeName:"user",activeName1:"list",addsch:!1,time:500}},created:function(){this.getSchool(),this.getSchoolCategory()},components:{Schart:a("S4mo").a},methods:{handleCurrentChange:function(t){this.cur_page=t,this.getSchool()},handleCurrentChange1:function(t){this.cur_page1=t,this.getUserlist()},handleCurrentChange2:function(t){this.cur_page2=t,this.getStudentlist()},handleCurrentChange3:function(t){this.cur_page3=t,this.getTeacherlist()},handleCurrentChange4:function(t){this.cur_page4=t,this.getVisitorlist()},handleCurrentChange5:function(t){this.cur_page5=t,this.getOrderlist()},showUser:function(t,e){l=e.school_id,this.userVisible=!0,this.getUserlist(!0),this.getStudentlist(!0),this.getTeacherlist(!0),this.getVisitorlist(!0)},showFinance:function(t,e){l=e.school_id,this.financeVisible=!0,this.getOrderlist(!0),this.getFinancialSummary(!0)},handleClick:function(t,e){console.log(t,e)},getSchool:function(){var t=this;$.ajax({type:"get",url:json.https+"/school/select_school",data:{start:t.cur_page},headers:{},success:function(e){console.log("获取全部学校列表返回"),console.log(e),t.total=Number(e.totle),t.tableData=e.data}})},getSchoolCategory:function(t){var e=this;t&&(e.cur_page1=1,e.total1=0),$.ajax({type:"get",url:json.https+"/class/select_list",headers:{},success:function(t){console.log("获取学校分类列表返回"),console.log(t),e.schoolCategory=t.data,e.schoolCategory1=t.data}})},search:function(t){t&&(this.cur_page=1,this.total=0);var e=this;e.class_id?$.ajax({type:"get",url:json.https+"/school/select_class_school",data:{class_id:e.class_id,start:e.cur_page},success:function(t){console.log("根据分类搜索学校返回"),console.log(t),e.total=Number(t.totle),e.tableData=t.data}}):e.$message.error("请选择学校分类")},synchronous:function(t,e){var a=this,l=this.$loading({lock:!0,text:"数据同步中",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.7)"});$.ajax({type:"get",url:json.https+"/dao/inser_user",data:{school_id:e.school_id},headers:{},success:function(t){console.log("学校数据同步返回"),console.log(t),200==t.code?(l.close(),a.getSchool(),a.$message.success("数据同步成功")):(l.close(),a.$message.error("数据同步失败"))}})},getOrderlist:function(t){var e=this;t&&(e.cur_page5=1,e.total5=0),$.ajax({type:"get",url:json.https+"/school/select_ord_b",data:{school_id:l,start:e.cur_page5},headers:{},success:function(t){console.log("获取学校订单返回"),console.log(t),200==t.code&&(e.total5=Number(t.totle),e.tableData5=t.data)}})},getUserlist:function(t){var e=this;t&&(e.cur_page1=1,e.total1=0),$.ajax({type:"get",url:json.https+"/school/select_user_b",data:{school_id:l,start:e.cur_page1},headers:{},success:function(t){console.log("获取学校用户表返回"),console.log(t),200==t.code&&(e.total1=Number(t.msg),e.tableData1=t.data)}})},getStudentlist:function(t){var e=this;t&&(e.cur_page2=1,e.total2=0),$.ajax({type:"get",url:json.https+"/school/select_stu_b",data:{school_id:l,start:e.cur_page2},headers:{},success:function(t){console.log("获取学校学生表返回"),console.log(t),200==t.code&&(e.total2=Number(t.msg),e.tableData2=t.data)}})},getTeacherlist:function(t){var e=this;t&&(e.cur_page3=1,e.total3=0),$.ajax({type:"get",url:json.https+"/school/select_tea_b",data:{school_id:l,start:e.cur_page3},headers:{},success:function(t){console.log("获取学校教师表返回"),console.log(t),200==t.code&&(e.total3=Number(t.msg),e.tableData3=t.data)}})},getVisitorlist:function(t){var e=this;t&&(e.cur_page4=1,e.total4=0),$.ajax({type:"get",url:json.https+"/school/select_vis_b",data:{school_id:l,start:e.cur_page4},headers:{},success:function(t){console.log("获取学校访客表返回"),console.log(t),200==t.code&&(e.total4=Number(t.msg),e.tableData4=t.data)}})},getFinancialSummary:function(){var t=this;$.ajax({type:"get",url:json.https+"/report/school_report",data:{school_id:l},headers:{},success:function(e){console.log("获取学校财务总结返回"),console.log(e),200==e.code&&(t.tableData6=[e.data])}})},handleAdd:function(t,e){e?(this.form=e,this.addsch=!1):(this.form={school_id:"",school_name:"",domain_name:"",jump:"",class_id:""},this.addsch=!0),this.editVisible=!0},handleDelete:function(t,e){e.id,this.idx=t,this.delVisible=!0},saveEdit:function(){var t=this;t.addsch?t.form.class_id&&t.form.school_id&&t.form.school_name&&t.form.domain_name&&t.form.jump?$.ajax({type:"post",url:json.https+"/school/insert_school",data:t.form,headers:{"content-type":"application/x-www-form-urlencoded"},success:function(e){console.log("添加学校返回"),console.log(e),200==e.code?(t.getSchool(),t.editVisible=!1,t.$message.success("添加成功")):t.$message.error(e.error)}}):t.$message.error("请完善信息！"):t.form.school_id&&t.form.school_name&&t.form.domain_name&&t.form.jump?$.ajax({type:"put",url:json.https+"/school/update_school",data:t.form,headers:{"content-type":"application/x-www-form-urlencoded"},success:function(e){console.log("修改学校返回"),console.log(e),200==e.code?(t.getSchool(),t.editVisible=!1,t.$message.success("修改成功")):t.$message.error(e.error)}}):t.$message.error("请完善信息！")},toLogin:function(t,e){e.jump?window.open(e.jump):this.$message.error("请添加子后台地址！")}}},s={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"table"},[a("div",{staticClass:"crumbs"},[a("el-breadcrumb",{attrs:{separator:"/"}},[a("el-breadcrumb-item",[a("i",{staticClass:"el-icon-tickets"}),t._v(" 学校管理")])],1)],1),t._v(" "),a("div",{staticClass:"container"},[a("div",{staticClass:"handle-box"},[a("el-button",{staticClass:"handle-del mr10",attrs:{type:"primary",icon:"delete"},on:{click:t.handleAdd}},[t._v("添加学校")]),t._v(" "),a("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"选择分类"},model:{value:t.class_id,callback:function(e){t.class_id=e},expression:"class_id"}},t._l(t.schoolCategory,function(t,e){return a("el-option",{key:e,attrs:{label:t.class_name,value:t.class_id}})})),t._v(" "),a("el-button",{attrs:{type:"primary",icon:"search"},on:{click:function(e){t.search(!0)}}},[t._v("搜索")])],1),t._v(" "),a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"ID",width:"80"}}),t._v(" "),a("el-table-column",{attrs:{prop:"school_id",label:"学校ID",sortable:"",width:"150"}}),t._v(" "),a("el-table-column",{attrs:{prop:"school_name",label:"学校名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"domain_name",label:"学校域名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"creatime",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{fixed:"right",label:"操作",width:"300"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"修改学校信息",placement:"top","open-delay":t.time}},[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-edit-outline"},on:{click:function(a){t.handleAdd(e.$index,e.row)}}})],1),t._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"同步数据",placement:"top","open-delay":t.time}},[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-sort"},on:{click:function(a){t.synchronous(e.$index,e.row)}}})],1),t._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"查看用户",placement:"top","open-delay":t.time}},[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-view"},on:{click:function(a){t.showUser(e.$index,e.row)}}})],1),t._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"查看财务",placement:"top","open-delay":t.time}},[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-tickets"},on:{click:function(a){t.showFinance(e.$index,e.row)}}})],1),t._v(" "),a("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"登录子后台",placement:"top","open-delay":t.time}},[a("el-button",{attrs:{size:"small",type:"primary",icon:"el-icon-printer"},on:{click:function(a){t.toLogin(e.$index,e.row)}}})],1)]}}])})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total},on:{"current-change":t.handleCurrentChange}})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"添加学校",visible:t.editVisible,width:"30%"},on:{"update:visible":function(e){t.editVisible=e}}},[a("el-form",{ref:"form",attrs:{model:t.form,"label-width":"100px"}},[a("el-form-item",{attrs:{label:"学校ID"}},[a("el-input",{attrs:{disabled:!t.addsch},model:{value:t.form.school_id,callback:function(e){t.$set(t.form,"school_id",e)},expression:"form.school_id"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"学校名称"}},[a("el-input",{model:{value:t.form.school_name,callback:function(e){t.$set(t.form,"school_name",e)},expression:"form.school_name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"学校域名"}},[a("el-input",{model:{value:t.form.domain_name,callback:function(e){t.$set(t.form,"domain_name",e)},expression:"form.domain_name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"子后台地址"}},[a("el-input",{model:{value:t.form.jump,callback:function(e){t.$set(t.form,"jump",e)},expression:"form.jump"}})],1),t._v(" "),t.addsch?a("el-form-item",{attrs:{label:"学校类别"}},[a("el-select",{staticClass:"handle-select mr10",attrs:{placeholder:"选择分类"},model:{value:t.form.class_id,callback:function(e){t.$set(t.form,"class_id",e)},expression:"form.class_id"}},t._l(t.schoolCategory1,function(t,e){return a("el-option",{key:e,attrs:{label:t.class_name,value:t.class_id}})}))],1):t._e()],1),t._v(" "),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:function(e){t.editVisible=!1}}},[t._v("取 消")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:t.saveEdit}},[t._v("确 定")])],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"用户管理",visible:t.userVisible,width:"90%"},on:{"update:visible":function(e){t.userVisible=e}}},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName,callback:function(e){t.activeName=e},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"用户列表",name:"user"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData1,border:""}},[a("el-table-column",{attrs:{prop:"user_openid",label:"用户ID",sortable:"",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_image",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"70px","max-height":"70px"},attrs:{src:t.row.user_image}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"user_alias",label:"昵称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_sex",label:"性别"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_iphone",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_mail",label:"邮箱"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_age",label:"年龄"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_card",label:"身份证"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_address",label:"地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_word",label:"工作单位"}}),t._v(" "),a("el-table-column",{attrs:{prop:"teacher",label:"是否老师"}}),t._v(" "),a("el-table-column",{attrs:{prop:"whether",label:"是否班主任"}}),t._v(" "),a("el-table-column",{attrs:{prop:"creat_time",label:"创建时间"}})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total1},on:{"current-change":t.handleCurrentChange1}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"学生列表",name:"student"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData2,border:""}},[a("el-table-column",{attrs:{prop:"stu_number",label:"学号",sortable:"",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"stu_sex",label:"性别"}}),t._v(" "),a("el-table-column",{attrs:{prop:"stu_age",label:"年龄"}}),t._v(" "),a("el-table-column",{attrs:{prop:"class_grade",label:"年级"}}),t._v(" "),a("el-table-column",{attrs:{prop:"class_name",label:"班级"}}),t._v(" "),a("el-table-column",{attrs:{prop:"stu_head",label:"生活头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"70px","max-height":"70px"},attrs:{src:t.row.user_image}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"stu_images1",label:"人像1"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"70px","max-height":"70px"},attrs:{src:t.row.user_image}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"stu_images2",label:"人像2"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"70px","max-height":"70px"},attrs:{src:t.row.user_image}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"user_openid",label:"默认家长ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"默认家长名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_iphone",label:"默认家长手机"}}),t._v(" "),a("el-table-column",{attrs:{prop:"creat_time",label:"创建时间"}})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total2},on:{"current-change":t.handleCurrentChange2}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"老师列表",name:"teacher"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData3,border:""}},[a("el-table-column",{attrs:{prop:"user_openid",label:"用户ID",sortable:"",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_image",label:"头像"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"70px","max-height":"70px"},attrs:{src:t.row.user_image}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"user_alias",label:"昵称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"名称"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_sex",label:"性别"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_iphone",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_mail",label:"邮箱"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_age",label:"年龄"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_card",label:"身份证"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_address",label:"地址"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_word",label:"工作单位"}}),t._v(" "),a("el-table-column",{attrs:{prop:"class_grade",label:"年级"}}),t._v(" "),a("el-table-column",{attrs:{prop:"class_name",label:"班级"}}),t._v(" "),a("el-table-column",{attrs:{prop:"work_number",label:"工号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"subjects",label:"学科"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_image",label:"人像1"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"70px","max-height":"70px"},attrs:{src:t.row.user_image}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"user_image",label:"人像2"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"70px","max-height":"70px"},attrs:{src:t.row.user_image}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"whether",label:"是否是班主任"}}),t._v(" "),a("el-table-column",{attrs:{prop:"status",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{prop:"creat_time",label:"创建时间"}})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total3},on:{"current-change":t.handleCurrentChange3}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"访客列表",name:"visitor"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData4,border:""}},[a("el-table-column",{attrs:{prop:"visitor_id",label:"访客ID",sortable:""}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_openid",label:"用户ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_iphone",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"visitor_head1",label:"访客人像1"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"70px","max-height":"70px"},attrs:{src:t.row.user_image}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"visitor_head2",label:"访客人像2"},scopedSlots:t._u([{key:"default",fn:function(t){return[a("img",{staticStyle:{"max-width":"70px","max-height":"70px"},attrs:{src:t.row.user_image}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"visitor_time",label:"访客时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"visitor_butt",label:"拜访人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"visitor_reason",label:"拜访理由"}}),t._v(" "),a("el-table-column",{attrs:{prop:"vistior_status",label:"状态"}}),t._v(" "),a("el-table-column",{attrs:{prop:"creat_time",label:"创建时间"}})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total4},on:{"current-change":t.handleCurrentChange4}})],1)],1)],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"财务管理",visible:t.financeVisible,width:"90%"},on:{"update:visible":function(e){t.financeVisible=e}}},[a("el-tabs",{on:{"tab-click":t.handleClick},model:{value:t.activeName1,callback:function(e){t.activeName1=e},expression:"activeName1"}},[a("el-tab-pane",{attrs:{label:"订单列表",name:"list"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData5,border:""}},[a("el-table-column",{attrs:{prop:"school_id",label:"学校ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"order_id",label:"订单ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_openid",label:"用户ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"user_name",label:"用户名",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"goods_name",label:"商品名称",sortable:"",width:"120"}}),t._v(" "),a("el-table-column",{attrs:{prop:"goods_price",label:"商品价格(￥)",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"goods_times",label:"商品时长(天)",width:"100"}}),t._v(" "),a("el-table-column",{attrs:{prop:"order_status",label:"订单状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.order_status?a("span",{staticClass:"green"},[t._v("已支付")]):t._e(),t._v(" "),a("span",{directives:[{name:"elif",rawName:"v-elif",value:0==e.row.order_status,expression:"scope.row.order_status == 0"}],staticClass:"red"},[t._v("未支付")])]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"creatime",label:"创建时间",width:"150"}})],1),t._v(" "),a("div",{staticClass:"pagination"},[a("el-pagination",{attrs:{layout:"prev, pager, next",total:t.total5},on:{"current-change":t.handleCurrentChange5}})],1)],1),t._v(" "),a("el-tab-pane",{attrs:{label:"财务统计",name:"summary"}},[a("el-table",{ref:"multipleTable",staticStyle:{width:"100%"},attrs:{data:t.tableData6,border:""}},[a("el-table-column",{attrs:{prop:"week",label:"周总额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"month",label:"月总额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"quarter",label:"季度总额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"s_quarter",label:"上一季度总额"}}),t._v(" "),a("el-table-column",{attrs:{prop:"year",label:"年总额"}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var r=a("VU/8")(o,s,!1,function(t){a("6oi0")},"data-v-40ed2519",null);e.default=r.exports}});