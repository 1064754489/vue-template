<template>
  <div class="main-content">hello world1!</div>
</template>
<script>
export default {
  name: 'Home',
  data() {
    return {}
  },
  methods: {
    test() {
      const a = 121
      const b = 2
      if (a === b) {
        console.log(a + b)
      }
    },
  },
}
</script>
<style lang="less" scoped>
.main-content {
  background-color: aliceblue;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}
</style>
