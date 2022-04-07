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
          @click="selectAllElder"
          >搜索</el-button
        >
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{ prop: 'date', order: 'descending' }"
    >
      <el-table-column prop="id" label="老人ID" sortable width="100">
      </el-table-column>
      <el-table-column prop="name" label="姓名" sortable width="130">
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="创建时间"
        :formatter="formatter"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        :formatter="formatter"
        width="160"
      >
      </el-table-column>
      <el-table-column
        prop="low_blood_pressure"
        label="舒张压"
        :formatter="formatter"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="high_blood_pressure"
        label="收缩压"
        :formatter="formatter"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="heart_rate"
        label="心率"
        :formatter="formatter"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="hearing"
        label="听力"
        :formatter="formatter"
        width="130"
      >
      </el-table-column>
      <el-table-column
        prop="weight"
        label="体重"
        :formatter="formatter"
        width="130"
      >
      </el-table-column>
      <!-- <el-table-column
        prop="updateTime"
        label="更新时间"
        :formatter="formatter"
        width="250"
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        :formatter="formatter"
        width="250"
      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"
        :formatter="formatter"
        width="250"
      >
      </el-table-column> -->
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="warning" size="mini"
            >图形化预览</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >查看</el-button
          >
          <el-button type="text" size="small">删除</el-button>
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

  <el-form-item label="活动区域" prop="bedNum">
    <el-select v-model="ruleForm.bedNum" placeholder="请选择活动区域">
      <el-option label="1" value="shanghai"></el-option>
      <el-option label="2" value="beijing"></el-option>
      <el-option label="3" value="beijing"></el-option>
      <el-option label="4" value="beijing"></el-option>
      <el-option label="5" value="beijing"></el-option>

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
export default {
  name: 'doctor',
  data () {
    return {
      ruleForm: [

      ],
      rules: {},
      RoomVisible: false,
      currentPage: '1',
      pageSize: '5',
      total: 10,
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  },
  methods: {
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(() => {
          done()
        })
        .catch(() => {})
    },
    addRoom () {
      this.RoomVisible = true
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
