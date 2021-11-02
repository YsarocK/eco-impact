import gsap from 'gsap'

export default {
  props: { obj: String },
  methods: {
    rotate (e) {
      if (this.$store.state.mouseMove === true) {
        gsap.to(this.$store.state.scene.getObjectByName(this.obj).rotation, { duration: 0.1, y: 0.001 * (e.clientX - (window.innerWidth / 2)), x: 0.001 * (e.clientY - (window.innerHeight / 2)) })
      }
    }
  },
  mounted () {
    window.addEventListener('mousemove', e => this.rotate(e))
  }
}
