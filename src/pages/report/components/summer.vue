<template>
  <div class="summer-wrapper">
    <el-row :gutter="20">
      <el-col v-for="item in data" :key="item.id" class="item-box" :span="6">
        <div class="title">
          {{ item.title || '--' }}
        </div>
        <div class="content">
          <div class="icon-img">
            <i class="el-icon-s-shop" />
          </div>
          <div class="total">
            {{ item.total }}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Summer',
  data() {
    return {
      data: [
        {
          id: 1,
          title: '指标1',
          total: 323,
        },
        {
          id: 2,
          title: '指标2',
          total: 123,
        },
        {
          id: 3,
          title: '指标3',
          total: 231,
        },
        {
          id: 4,
          title: '指标4',
          total: 454,
        },
      ],
    }
  },
}
</script>
<style lang="less" scoped>
.summer-wrapper {
  .item-box {
    margin-right: 20px;
    padding: 20px;
    border: 1px solid #e6e6e6;
    .content {
      display: flex;
      align-items: center;
      font-size: 20px;
      color: #64abfa;
      .icon-img {
        font-size: 32px;
      }
    }
  }
}
</style>
<style lang="less">
.summer-wrapper {
  .el-col-6 {
    width: 23%;
  }
}
</style>
