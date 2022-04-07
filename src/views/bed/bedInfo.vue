<template>
  <div style="padding: 10px">
    <div class="data-function">
      <!-- function -->
      <div style="margin: 10px 0">
        <el-button type="primary" @click="addRoom">新增</el-button>
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
        <el-button
          type="primary"
          icon="el-icon-search"
          style="margin-left: 5px"

          >搜索</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'id', order: 'descending' }"
      border
    >
      <el-table-column prop="id" label="ID" sortable width="102">
      </el-table-column>
      <el-table-column prop="floorNum" label="楼号" sortable width="180">
      </el-table-column>
      <el-table-column prop="roomNum" label="房间号" width="200" />

      <el-table-column prop="bedNum" label="剩余床位" width="200" /> 张
      <el-table-column prop="isStayin" label="是否有人入住" width="200" />

      <el-table-column label="操作" width="145">
        <template slot-scope="scope">
          <el-button type="warning" @click="handleEdit(scope.row)" size="small"
            >编辑</el-button
          >
          <el-button @click="handleDelete(scope.row)" type="danger" size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
       <template slot-scope="scope">
          <el-button
            type="success"
            size="small"
            :disabled="scope.row.bedNum < 1 ? true :false"
            @clic="stayIn(scope.row)"
            >入住</el-button>

          </template>

      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="pagination">
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
    </div>
    <!-- end -->
    <!-- 新增床位的模态框 -->
    <el-dialog
      title="新增房间"
      :visible.sync="RoomVisible"
      width="30%"
      :before-close="handleClose"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="楼号" prop="floorNum">
          <el-input v-model="ruleForm.floorNum"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="roomNum">
          <el-input v-model="ruleForm.roomNum"></el-input>
        </el-form-item>

        <el-form-item label="床位数量" prop="bedNum">
          <el-select v-model="ruleForm.bedNum" placeholder="请选择床位的数量">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="价格" prop="price">
          <el-input v-model="ruleForm.price"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="RoomVisible = false">取 消</el-button>
        <el-button type="primary" @click="RoomVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- end -->
  </div>
</template>
<style>
.data-function {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
}
.pagination {
  margin-top: 30px;
  justify-content: space-between;
  align-items: center;
}
</style>
<script>
import request from '@/utils/request.js'
export default {
  name: 'bed',
  data () {
    return {
      ruleForm: [],
      rules: {},
      RoomVisible: false,
      currentPage: 1,
      pageSize: 5,
      total: 10,
      tableData: [
        // {
        //   id: '5',
        //   floorNum: '2',
        //   roomNum: '101',
        //   isStayin: '0',
        //   bedNum: '4',
        //   prive: '300'
        // },
        // {
        //   id: '4',
        //   floorNum: '2',
        //   roomNum: '102',
        //   isStayin: '1',
        //   bedNum: '0',
        //   prive: '500'
        // },
        // {
        //   id: '3',
        //   floorNum: '2',
        //   roomNum: '103',
        //   isStayin: '1',
        //   bedNum: '0',
        //   prive: '400'
        // },
        // {
        //   id: '2',
        //   floorNum: '2',
        //   roomNum: '104',
        //   isStayin: '1',
        //   bedNum: '2',
        //   prive: '400'
        // },
        // {
        //   id: '1',
        //   floorNum: '2',
        //   roomNum: '503',
        //   isStayin: '1',
        //   bedNum: '4',
        //   prive: '200'
        // }
      ],
      isStayIn: false,
      search: ''
    }
  },
  created () {
    this.bedInfo()
  },
  methods: {
    // test (val) {
    //   console.log(val)
    //   if (val.bedNum < 1) {
    //     this.isStayIn = !this.isStayIn
    //   }
    // },
    bedInfo () {
      request
        .get('/beds/selectBedInfo', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.pageSize
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
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    addRoom () {
      this.RoomVisible = true
    },
    formatter (row, column) {
      return row.address
    },
    // 改变当页显示的条数
    handleSizeChange (val) {},
    // 翻页
    handleCurrentChange (val) {},
    addBed () {},

    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
