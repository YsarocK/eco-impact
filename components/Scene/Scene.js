import { mapActions, mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations(['RESIZE', 'RERENDER']),
    ...mapActions(['INIT'])
  },
  mounted () {
    this.INIT({
      width: window.innerWidth,
      height: window.innerHeight,
      el: this.$el
    }).then(() => {
      window.addEventListener('resize', () => {
        console.log('resized')
        this.RESIZE({
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight
        })
      })
    })
  }
}
