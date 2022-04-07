<template>
  <div style="padding: 10px">
    <div class="data-function">
      <!-- function -->
      <div style="margin: 10px 0">
        <el-button type="primary" @click="adddoctor()">新增</el-button>
      </div>
      <!--function end -->

      <!-- seach -->
      <div style="margin: 10px 0">
        <el-input
            type="text"
            v-model="search"
            placeholder="请输入要查找的名字"
            style="width: 60%"
            clearable
        >
        </el-input>
        <el-button
            type="primary"
            icon="el-icon-search"
            style="margin-left: 5px"
            @click="getAllDoctorInfo"
        >搜索
        </el-button
        >
      </div>
    </div>
    <el-table
        :data="doctorData"
        style="width: 100%"
        :default-sort="{ prop: 'date', order: 'descending' }"
        width="auto"
        :header-cell-style="{'text-align':'center'}"
        border
    >
      <el-table-column prop="id" label="ID" sortable>
      </el-table-column>
      <el-table-column prop="dname" label="姓名">
      </el-table-column>
      <el-table-column prop="floor" label="楼层" sortable>
      </el-table-column>
      <el-table-column prop="room" label="房间" sortable>
      </el-table-column>
      <el-table-column prop="phone" label="手机号">
      </el-table-column>
      <el-table-column prop="email" label="邮箱">
      </el-table-column>
      <el-table-column prop="stationName" label="职位">
      </el-table-column>
      <el-table-column label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="updateDoctor(scope.row)">编辑</el-button>
          <el-button @click="deleteDoctor(scope.row)" type="text" size="small"
          >刪除
          </el-button>
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
    <!-- 新增医生的模态框 -->
    <el-dialog
        title="新增医生"
        :visible.sync="DoctorVisible"
        width="30%"
        :before-close="handleCloseAdd"
    >
      <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="医生姓名" prop="dname">
          <el-input v-model="ruleForm1.dname"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="stationid">
          <el-select v-model="ruleForm1.stationid" placeholder="请选择活动区域">
            <el-option
                v-for="item in stationData"
                :key="item.id"
                :label="item.stationName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在楼号" required prop="floor">
          <el-input v-model="ruleForm1.floor"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="room">
          <el-input v-model="ruleForm1.room"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm1.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm1.email"></el-input>
        </el-form-item>
        <!--  <el-form-item>-->
        <!--    <el-button type="primary" @click="submitForm('ruleForm1')">立即创建</el-button>-->
        <!--    <el-button @click="resetForm('ruleForm1')">重置</el-button>-->
        <!--  </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm1')">重置</el-button>
        <el-button type="primary" @click="addDoctor()">立即新增</el-button>
      </span>
    </el-dialog>
    <!-- end -->
    <!--  更新-->
    <el-dialog
        title="更新医生"
        :visible.sync="updateDoctorDialog"
        width="30%"
        :before-close="handleCloseUpdate"
    >
      <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" class="demo-ruleForm">
        <el-form-item label="医生姓名" prop="dname">
          <el-input v-model="ruleForm1.dname"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="stationid">
          <el-select v-model="ruleForm1.stationid"  placeholder="请选择活动区域">
            <el-option
                v-for="item in stationData"
                :key="item.id"
                :label="item.stationName"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在楼号" required prop="floor">
          <el-input v-model="ruleForm1.floor"></el-input>
        </el-form-item>
        <el-form-item label="房间号" prop="room">
          <el-input v-model="ruleForm1.room"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="ruleForm1.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm1.email"></el-input>
        </el-form-item>
        <!--  <el-form-item>-->
        <!--    <el-button type="primary" @click="submitForm('ruleForm1')">立即创建</el-button>-->
        <!--    <el-button @click="resetForm('ruleForm1')">重置</el-button>-->
        <!--  </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="resetForm('ruleForm1')">重置</el-button>
        <el-button type="primary" @click="saveUpdateDoctor()">立即更新</el-button>
      </span>
    </el-dialog>
    <!-- end-->
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
import result from '../../utils/request.js'

export default {
  name: 'doctor',
  data() {
    return {
      ruleForm1: {
        dname: '',
        stationid: 1,
        floor: '',
        room: '',
        phone: '',
        email: '',

      },
      stationData: [],
      doctorData: [],
      rules: {
        dname: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
        ],
        stationid: [
          {required: true, message: '请选择医生职位', trigger: 'change'}
        ],
        email: [
          {type: 'email', required: true, message: '请输入邮箱', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请输入电话', trigger: 'change'},
          {min: 6, max: 11, message: '长度在 6 到 11 个字符', trigger: 'blur'}
        ],
        floor: [
          {required: true, message: '请输入楼号', trigger: 'change'},
        ],
        room: [
          {required: true, message: '请输入房间号', trigger: 'change'},
        ]

      },
      DoctorVisible: false,
      currentPage: '1',
      pageSize: '5',
      total: 1,
      search: '',
      updateDoctorDialog: false
    }
  },
  created() {
    this.getAllDoctorInfo()
  }
  ,
  methods: {
    getStation() {
      result.get('/station/getStation').then(res => {
        this.stationData = res.data
      })
    },
    handleCloseUpdate(done) {
      this.$confirm('确认关闭？')
          .then((_) => {
            this.updateDoctorDialog=false
            this.resetForm('ruleForm1')
          })
          .catch(() => {

          })
    },
    handleCloseAdd(done) {
      this.$confirm('确认关闭？')
          .then((_) => {
            this.DoctorVisible=false
            this.resetForm('ruleForm1')
          })
          .catch(() => {

          })
    },
    adddoctor() {
      this.$nextTick(() => {
        this.getStation()
      })
      this.DoctorVisible = true
    },
    addDoctor() {
      result.post('/doctor', this.ruleForm1).then(res => {
        if (res.code === 200) {
          this.$message(
              {
                message: '恭喜你，新增成功',
                type: 'success'
              },
             )
          this.DoctorVisible = false
              this.getAllDoctorInfo()
          this.resetForm('ruleForm1')
        } else {
          this.$message.error('啊哦~，新增失败了哦请重新试一下吧')
        }
      })
    },
    updateDoctor(row) {
      this.$nextTick(() => {
        this.getStation()
      })
      this.ruleForm1 = JSON.parse(JSON.stringify(row))
      this.updateDoctorDialog = true
    },
    saveUpdateDoctor() {
      result.put('/doctor', this.ruleForm1).then(res => {
        if (res.code === 200) {
          this.$message(
              {
                message: '恭喜你，更新成功了',
                type: 'success'
              },
              this.updateDoctorDialog = false,
              this.getAllDoctorInfo(),
              this.resetForm('ruleForm1')
          )
        } else {
          this.$message.error('啊哦~，更新失败了哦请重新试一下吧')
        }
      })
    },
    deleteDoctor(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDoctor1(row);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    deleteDoctor1(row) {
      result.delete('/doctor', {
        params: {
          id: row.id
        }
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getAllDoctorInfo()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 改变当页显示的条数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.getAllDoctorInfo()
    },
    // 翻页
    handleCurrentChange(pageNum) {
      this.currentPage = pageNum
      this.getAllDoctorInfo()
    },

    resetForm(formName) {

        this.$refs[formName].resetFields()
    },

    //获取医生信息
    getAllDoctorInfo() {
      result.get('/doctor/info',
          {
            params: {
              pageNum: this.currentPage,
              pageSize: this.pageSize,
              search: this.search
            }
          }
      ).then(res => {
        this.doctorData = res.data.records
        this.total = res.data.total
        this.pageSize = res.data.size
        this.currentPage = res.data.current
      })
    }
  }
}
</script>
