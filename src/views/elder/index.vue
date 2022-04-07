<template>
  <div style="padding: 10px">
    <div class="data-function">
      <!-- function -->
      <div style="margin: 10px 0">

        <el-button type="primary" @click="addUser">新增</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary">导出</el-button>
      </div>
      <!--function end -->

      <!-- seach -->
      <div style="margin: 10px 0">
        <el-input
          type="text"
          v-model="search"
          placeholder="请输入内容"
          style="width: 60%"
          clearable
        >

       </el-input>
          <el-button type="primary" icon="el-icon-search" style="margin-left: 5px;" @click="selectAllElder">搜索</el-button>
      </div>

      <!-- seach end -->
    </div>
    <el-table :data="tableData" stripe border style="width: 100%" :header-cell-style="{'text-align':'center'}">
      <el-table-column prop="id" label="ID"  sortable>
      </el-table-column>
      <el-table-column prop="name" label="姓名" width="80px"> </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column  label="性别" width="80px">
              <template slot-scope="scope">
              <span v-if="scope.row.sex===1">男</span>
              <span v-if="scope.row.sex===2">女</span>
              <span v-if="scope.row.sex===3">未知</span>
              </template>
      </el-table-column>
      <el-table-column prop="address" label="地址"  width="150px"> </el-table-column>
      <el-table-column prop="phone" label="性别"> </el-table-column>
      <el-table-column prop="selfcareLevel" label="自理等级"> </el-table-column>
      <el-table-column prop="isillness" label="是否患有重大疾病">
        <template slot-scope="scope">
              <span v-if="scope.row.isillness===1">是</span>
              <span v-if="scope.row.isillness===0">否</span>

              </template>
      </el-table-column>
      <el-table-column prop="content" label="疾病内容"> </el-table-column>
      <el-table-column prop="selfcareLevel" label="自理等级"> </el-table-column>
      <el-table-column prop="member.mname" label="家属姓名"> </el-table-column>
      <el-table-column prop="member.mphone" width="110px" label="家属手机号">
      </el-table-column>
      <el-table-column label="操作" width="170px" class="handle" >
        <template slot-scope="scope">
          <el-button class="el-icon-edit" @click="handleEdit(scope.row)" type="warning"
            style="width:65px;height:30px;line-height: 5px;"
            ></el-button>
              <el-button style="width:65px;height:30px;line-height: 5px;" class="el-icon-delete" @click="handledelete(scope.row)" type="danger"
            ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      background
      :total="total"
    >
    </el-pagination>

    <el-dialog
      title="提示"
      width="30%"
      :before-close="handleClose"
      :append-to-body="true"
      destroy-on-close
      :visible.sync="specDlgVisible"
      class="spec-dialog"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input
            v-model="form.username"
            style="border-radius: 10%; width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input
            v-model="form.age"
            style="border-radius: 10%; width: 250px"
          ></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="radio" label="1">男</el-radio>
          <el-radio v-model="radio" label="2">女</el-radio>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input
            v-model="form.address"
            style="border-radius: 10%; width: 250px"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="手机号" :label-width="formLabelWidth">
          <el-input
            v-model="form.phone"
            style="border-radius: 10%; width: 250px"
            type="text"
          ></el-input>
        </el-form-item>
        <el-form-item label="护理等级" :label-width="formLabelWidth">
          <el-input
            v-model="form.selfcareLevel"
            style="border-radius: 10%; width: 250px"
            type="textarea"
          ></el-input>
        </el-form-item>

        <el-form-item label="是否患有重大疾病" :label-width="formLabelWidth">
          <el-radio v-model="isillness" label="1">是</el-radio>
          <el-radio v-model="isillness" label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="疾病内容" :label-width="formLabelWidth">
          <el-input
            v-model="form.content"
            style="border-radius: 10%; width: 250px"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="家属姓名" :label-width="formLabelWidth">
          <el-input
            v-model="form.mname"
            style="border-radius: 10%; width: 250px"
            type="textarea"
          ></el-input>
        </el-form-item>
        <el-form-item label="家属手机号" :label-width="formLabelWidth">
          <el-input
            v-model="form.mphone"
            style="border-radius: 10%; width: 250px"
            type="text"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="less" scoped>
.data-function {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
/* 弹出框滚动条 */
/* 设置滚动条的样式 */
/**解决了滚动条之间发生错位的现象 */
/* ::-webkit-scrollbar {
  width: 10px !important;
  height: 10px !important;
  border-radius: 5px;
}
::-webkit-scrollbar-thumb {
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
  /* 滚动条的颜色 */
/* background-color: #e4e4e4;
 } */
.spec-dialog .el-dialog_body {
  padding: 3px 30px;
  overflow-y: auto;
  height: calc(100vh - 140px);
}
el-table-column{
  text-align: center;
}
</style>
<script>
import request from '@/utils/request.js'
export default {
  name: 'User',
  data () {
    return {
      radio: '',
      form: {},
      specDlgVisible: false,
      formLabelWidth: '',
      currentPage: 1,
      total: 10,
      pageSize: 5,
      search: '',
      tableData: [
        {
          member: {}
        }
      ]
    }
  },
  created () {
    this.selectAllElder()
  },
  methods: {
    selectAllElder () {
      request
        .get('/elderlyInfo', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize,
            search: this.search
          }
        })
        .then((res) => {
          this.tableData = res.data.records
          this.total = res.data.total
          this.pageSize = res.data.size
          this.currentPage = res.data.current
        })
    },
    addUser () {
      this.specDlgVisible = true
      this.form = {}
    },
    handleEdit (data) {},
    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.selectAllElder()
    },
    handleCurrentChange (pageNum) {
      this.currentPage = pageNum
      this.selectAllElder()
    }
  }
}
</script>
