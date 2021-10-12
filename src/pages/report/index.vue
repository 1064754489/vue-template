<template>
  <div id="pdfDom" class="report-wrapper">
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Summer />
    <Line1 />
    <el-button @click="toPdf">导出pdf</el-button>
  </div>
</template>
<script>
import Summer from './components/summer.vue'
import Line1 from './components/line.vue'
export default {
  name: 'Report',
  components: {
    Summer,
    Line1,
  },
  data() {
    return {}
  },
  methods: {
    toPdf() {
      this.$nextTick(() => {
        this.getPdf()
      })
    },
  },
}
</script>
