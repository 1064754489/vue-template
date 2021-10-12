import html2canvas from 'html2canvas'
import JsPDF from 'jspdf'

export default {
  install(Vue, option) {
    Vue.prototype.getPdf = function () {
      // 当下载pdf时，若不在页面顶部会造成PDF样式不对,所以先回到页面顶部再下载
      let top = document.getElementById('pdfDom')
      if (top != null) {
        top.scrollIntoView()
        top = null
      }
      const title = this.exportPDFtitle
      html2canvas(document.querySelector('#pdfDom'), {
        allowTaint: true,
      }).then(function (canvas) {
        // 获取canvas画布的宽高
        const contentWidth = canvas.width
        const contentHight = canvas.height
        // 一页pdf显示html页面生成的canvas高度;
        const pageHeight = (contentWidth / 841.89) * 592.28
        // 未生成pdf的html页面高度
        let leftHeight = contentHight
        // 页面偏移
        let position = 0
        // html页面生成的canvas在pdf中图片的宽高
        const imgWidth = 841.89
        const imgHeight = (841.89 / contentWidth) * contentHight
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const PDF = new JsPDF('l', 'pt', 'a4')

        // 当内容未超过pdf一页显示的范围，无需分页
        if (leftHeight < pageHeight) {
          PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
        } else {
          while (leftHeight > 0) {
            PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
            leftHeight -= pageHeight
            position -= 592.28
            // 避免添加空白页
            if (leftHeight > 0) {
              PDF.addPage()
            }
          }
        }
        PDF.save(title + '.pdf')
      })
    }
  },
}
