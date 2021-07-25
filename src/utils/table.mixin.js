export default {
  created () {
    window.addEventListener('resize', this.resizeTableRow)
  },
  destroyed () {
    window.removeEventListener('resize', this.resizeTableRow)
  },
  methods: {
    resizeTableRow () {
      setTimeout(() => {
        document.getElementsByClassName('el-table__row').forEach(el => {
          // el.style.width = `${document.querySelector('tbody').clientWidth}px`
          el.style.width = `${document.getElementsByClassName('el-table__body-wrapper')[0].clientWidth}px`
        })
      }, 50)
    }
  }
}
