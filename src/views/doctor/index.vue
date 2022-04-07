<template>
  <div style="padding: 10px">
    <div class="data-function">
      <!-- function -->
      <div style="margin: 10px 0">
        <el-button type="primary" @click="addRoom">导入</el-button>
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
      width="auto"
      border
    >
      <el-table-column prop="id" label="老人ID" sortable >
      </el-table-column>
      <el-table-column prop="name" label="姓名"  >
      </el-table-column>
      <el-table-column
        prop="createdTime"
        label="创建时间"


      >
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间"


      >
      </el-table-column>
      <el-table-column
        prop="low_blood_pressure"
        label="舒张压"


      >
      </el-table-column>
      <el-table-column
        prop="high_blood_pressure"
        label="收缩压"


      >
      </el-table-column>
      <el-table-column
        prop="heart_rate"
        label="心率"


      >
      </el-table-column>
      <el-table-column
        prop="hearing"
        label="听力"


      >
      </el-table-column>
      <el-table-column
        prop="weight"
        label="体重"

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
      <el-table-column label="操作"  width="230px">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="warning" size="mini">图形化预览</el-button>
          <el-button @click="handleClick(scope.row)" type="success" size="mini"
          >设置预警数值</el-button>
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
import request from "../../utils/request";
export default {
  name: 'index',
  data () {
    return {

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
  created(){
    this.getAllBodyInfo()
  }
  ,
  methods: {
    getAllBodyInfo(){
      request.get('/getBodyInfo').then(res=>{
        console.log(res)
        this.tableData=res.data
      })
    }
    ,
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },

    // 改变当页显示的条数
    handleSizeChange (val) {},
    // 翻页
    handleCurrentChange (val) {},
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
