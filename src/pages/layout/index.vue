<template>
  <div>
    <el-container>
      <el-header>
        <Navbar />
      </el-header>
      <el-container>
        <Sidebar />
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sidebar from '@/components/sidebar.vue'
import Navbar from '@/components/navbar.vue'

export default {
  name: 'Layout',
  components: {
    Sidebar,
    Navbar,
  },
}
</script>
<style lang="less" scoped>
.header {
  background-color: rgba(2, 137, 247, 0.705);
  height: 100%;
}
</style>
\
<style lang="less">
.el-menu-vertical-demo {
  min-height: calc(100vh - 70px);
}
</style>
