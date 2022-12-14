<template>
  <div class="app-container">
    <!-- 表格 -->
    <el-table :data="list" border stripe>
      <el-table-column type="index" width="50" />
      <el-table-column prop="borrowAmount" label="借款额度" />
      <el-table-column prop="integralStart" label="积分区间开始" />
      <el-table-column prop="integralEnd" label="积分区间结束" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.id)"
          >
            删除
          </el-button>
          <router-link
            :to="'/core/integral-grade/edit/' + scope.row.id"
            style="margin-right: 5px"
          >
            <el-button type="primary" size="mini" icon="el-icon-edit">
              修改
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import integralGradeApi from '@/api/core/integral-grade'
export default {
  // 定义数据模型
  data() {
    return {
      list: [], // 数据列表
      currentPage: 1,
      pageSize: 3,
      total: 10,
    }
  },

  // 页面渲染成功后获取数据
  created() {
    this.fetchData(this.currentPage,this.pageSize)
  },

  // 定义方法
  methods: {
    fetchData(currentPage,pageSize) {
      // 调用api
      integralGradeApi.pageList(currentPage,pageSize).then((response) => {
        // debugger
        this.list = response.data.list.records
        this.total = response.data.list.total
      })
    },
    // 根据id删除数据
    removeById(id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          integralGradeApi.removeById(id).then((response) => {
            this.$message.success(response.message)
            this.fetchData()
          })
        })
        .catch((error) => {
          this.$message.info('取消删除')
        })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.fetchData(this.currentPage,this.pageSize)
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.fetchData(this.currentPage,this.pageSize)
      console.log(`当前页: ${val}`)
    },
  },
}
</script>