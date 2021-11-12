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
import axios from 'axios'
export default {
  name: 'Report',
  components: {
    Summer,
    Line1,
  },
  data() {
    return {}
  },
  mounted() {
    axios
      .post('http://127.0.0.1:8000/pkReadApi/1710YearGrandCeremony', {
        a: 333,
      })
      .then((rsp) => {
        console.log(rsp.data)
      })
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
