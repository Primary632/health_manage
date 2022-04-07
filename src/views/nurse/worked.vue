<template>
  <div>
    注：以下数据分别是 体温：每日必填 其中血压血脂血糖为两周填写一次
    <div id="box-card">

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>每日体温(每日必填)</span>
        </div>
        <template>
          <el-table :data="tableData" style="width: auto">
            <el-table-column prop="id" label="ID" width="50"> </el-table-column>
            <el-table-column prop="name" label="姓名" >
            </el-table-column>
            <el-table-column prop="date" label="日期" >
            </el-table-column>
            <el-table-column prop="temperature" label="温度(°C)" >
            </el-table-column>
            <el-table-column prop="temperature" label="血压" >
            </el-table-column>
            <el-table-column prop="temperature" label="血脂" >
            </el-table-column>
            <el-table-column prop="temperature" label="血糖" >
            </el-table-column>
            <el-table-column label="操作" width="200">
              <div>
                <el-button type="primary" size="mini">上报数据</el-button>

                <el-button class="editT" type="primary" size="mini"
                  >修改</el-button
                >
              </div>
            </el-table-column>
          </el-table>
        </template>

        <el-pagination background layout="prev, pager, next" :total="30">
        </el-pagination>
      </el-card>

    </div>
  </div>
</template>
<style scoped>
.editT {
  width: 80px;
  margin-left: 6px;
  text-align: center;
}


.box-card {
  width: 100%;
  height: 100%;
}
#box2 {
  display: flex;
  justify-content: space-around;
}
#box-card {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}
</style>
<script>
export default {
  name: 'worked',
  data () {
    return {
      tableData: [
        {
          id: 1,
          name: '小红',
          date: '2021-10-6',
          temperature: '36.5'
        },
        {
          id: 2,
          name: '小红',
          date: '2021-10-6',
          temperature: '36.5'
        },
        {
          id: 3,
          name: '小红',
          date: '2021-10-6',
          temperature: '36.5'
        },
        {
          id: 4,
          name: '小红',
          date: '2021-10-6',
          temperature: '36.5'
        },
        {
          id: 1,
          name: '小红',
          date: '2021-10-6',
          temperature: '36.5'
        }
      ]
    }
  }
}
</script>
