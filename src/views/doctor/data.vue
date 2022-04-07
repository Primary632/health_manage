<template>
  <div>
    <el-row class="home" :gutter="100">
      <el-col :span="8" style="margin-top: 20px">
        <el-card shafow="hover">
          <div class="user">
            <img :src="userImage" alt="用户照片" />
            <div class="userinfo">
              <p class="name">翠花</p>
              <p class="bed">3号楼101室2床</p>
            </div>
          </div>
        </el-card>
      </el-col>

    </el-row>
 <el-row :gutter="100">
 <el-col :span="10" type="flex" style="margin-top: 20px">
        <el-card shafow="hover">
          <div id="main" style="width: 100%; height: 250%"></div>
        </el-card>
      </el-col>
 </el-row>
  </div>

</template>
<script>
// 基于准备好的dom，初始化echarts实例

export default {
  name: 'Data',
  data () {
    return {
      userImage: require('@/assets/images/user.png')

    }
  },
  mounted () {
    this.echartsTest()
    this.drawLine1()
  },
  methods: {
    echartsTest () {
      var myChart = this.$echarts.init(document.getElementById('main'))
      var option = {
        title: {
          text: '数据信息'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['体温', '血压', '身高', '血脂', '心率']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '体温',
            type: 'line',
            stack: '总量',
            data: [36.4, 36.5, 36.6, 36.4, 36.8, 37.5, 37.5]
          },
          {
            name: '血压',
            type: 'line',
            stack: '总量',
            data: [130, 175, 156, 185, 166, 150, 160]
          },
          {
            name: '身高',
            type: 'line',
            stack: '总量',
            data: [170, 170, 170, 170, 170, 170, 170]
          },
          {
            name: '血脂',
            type: 'line',
            stack: '总量',
            data: [123, 122, 111, 121, 152, 141, 161]
          },
          {
            name: '心率',
            type: 'line',
            stack: '总量',
            data: [70, 65, 80, 75, 76, 68, 77]
          }
        ]
      }
      myChart.setOption(option)
    }

  }
}
</script>
