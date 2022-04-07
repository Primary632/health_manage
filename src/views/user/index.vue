<template slot-scope="scope">
  <div style="padding: 10px">
    <div class="data-function">
      <!-- function -->
      <div style="margin: 10px 0">
        <el-button type="primary">导入</el-button>
        <el-button type="primary">导出</el-button>
      </div>
      <!--function end -->

      <!-- seach -->
      <div style="margin: 10px 0">
        <el-input
          v-model="search"
          placeholder="请输入内容"
          style="width: 60%"
          clearable
        ></el-input>
        <el-button style="margin-left: 5px" type="primary" @click="load"
          >查询</el-button
        >
      </div>

      <!-- seach end -->
    </div>
    <!-- Body -->
    <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" sortable>
      </el-table-column>
      <el-table-column prop="user.username" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="nickName" label="昵称"> </el-table-column>
      <el-table-column prop="phone" label="电话"> </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="registrationTime" label="注册时间">
      </el-table-column>
      <el-table-column label="权限">
        <template #default="scope">
          <span v-if="scope.row.user.role === 1">管理员</span>
          <span v-if="scope.row.user.role === 2">医生</span>
          <span v-if="scope.row.user.role === 3">护士</span>
          <span v-if="scope.row.user.role === 4">家属</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            @click="handleEdit(scope.row)"
            type="warning"
            icon="el-icon-edit"
            circle
            size="mini"
          ></el-button>
          <el-button
            @click="LookUser(scope.row)"
            icon="el-icon-search"
            circle
            size="mini"
          ></el-button>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="状态" width="150" height="50px">
        <template slot-scope="scope">
          <!-- <el-input v-model="scope.row.user"></el-input> -->
          <el-switch
            style="display: block"
            v-model="scope.row.user.status"
            :active-value="1"
            :inactive-value="0"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="启用"
            inactive-text="禁用"
            @change="changeStatus(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
    </el-table>
    <!-- end -->
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
    <!-- 更新 -->
    <el-dialog
      title="更新"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            v-model="form.user.username"
            style="border-radius: 10%; width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input
            v-model="form.nickName"
            style="border-radius: 10%; width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">

            <el-radio v-model="form.sex" label=1>男</el-radio>
            <el-radio v-model="form.sex" label=2>女</el-radio>
            <el-radio v-model="form.sex" label=3>未知</el-radio>

        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input
            v-model="form.email"
            style="width: 250px"
            type="email"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input
            v-model="form.address"
            style="border-radius: 10%; width: 250px"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 更新end -->
    <!-- 查看 -->
    <el-dialog
      title="查看"
      :visible.sync="LookVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input
            :disabled="true"
            v-model="form.user.username"
            style="border-radius: 10%; width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input
            :disabled="true"
            v-model="form.nickName"
            style="border-radius: 10%; width: 250px"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio disabled v-model="form.sex" v-if="form.sex===1" label="form.sex">男</el-radio>
          <el-radio disabled v-model="form.sex" v-if="form.sex===2" label="form.sex">女</el-radio>
          <el-radio disabled v-model="form.sex" v-if="form.sex===3" label="form.sex">未知</el-radio>

        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input
            :disabled="true"
            v-model="form.email"
            style="width: 250px"
            type="email"
          ></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth">
          <el-input
            :disabled="true"
            v-model="form.address"
            style="border-radius: 10%; width: 250px"
            type="textarea"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="LookVisible = false" size="small"
          >关 闭</el-button
        >
      </span>
    </el-dialog>
    <!-- 查看结束 -->
  </div>
</template>

<style lang="less" scoped>
.data-function {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
el-pagination {
  margin-top: 100px;
}
</style>
<script>
import request from '../../utils/request.js'
export default {
  name: 'User',
  data () {
    return {
      formLabelWidth: '',
      LookVisible: false,

      form: {

        user: {
          username: null,
          status: null
        }
      },
      dialogVisible: false,
      status: false,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      search: '',
      tableData: [
        {
          user: {
            status: null
          }
        }
      ]
    }
  },
  created () {
    this.load()
  },
  methods: {
    load () {
      request
        .get('/userInfo', {
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
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    LookUser (data) {
      this.form = JSON.parse(JSON.stringify(data))
      console.log(this.form)
      this.LookVisible = true
    },
    handleEdit (data) {
      this.form = JSON.parse(JSON.stringify(data))
      alert(data.sex)
      console.log(this.form)
      this.dialogVisible = true
    },

    handleSizeChange (pageSize) {
      this.pageSize = pageSize
      this.load()
    },
    handleCurrentChange (pageNum) {
      this.currentPage = pageNum
      this.load()
    },

    saveUser () {
      console.log('ID为' + this.form.id)

      request.put('/userInfo/updateUser', this.form).then((res) => {
        if (res.code === 200) {
          this.$message(
            {
              message: '恭喜你，更新成功了',
              type: 'success'
            },
            this.dialogVisible = false,
            this.load()
          )
        } else {
          this.$message.error('啊哦~，更新失败了哦请重新试一下吧')
        }
      })
    }
  },
  changeStatus (row) {
    request.put('', row).then((res) => {})
  }
}
</script>
