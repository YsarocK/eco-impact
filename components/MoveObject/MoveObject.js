import gsap from 'gsap'
const moves = ['pos', 'rot']
const axis = ['X', 'Y', 'Z']

export default {
  props: { obj: String, rotX: Number, rotY: Number, rotZ: Number, rotDur: Number, posX: Number, posY: Number, posZ: Number, posDur: Number },
  computed: {
    rotObj: function () {
      const move = { pos: { duration: this.posDur }, rot: { duration: this.rotDur } }
      for (let y = 0; y < 2; y++) {
        for (let i = 0; i < 3; i++) {
          const value = this[(moves[y] + axis[i])]
          if (value !== undefined) {
            move[moves[y]][axis[i].toLowerCase()] = parseFloat(value)
          }
        }
      }
      return move
    }
  },
  methods: {
    handleClick: function () {
      gsap.to(this.$store.state.scene.getObjectByName(this.obj).rotation, this.rotObj.rot)
      gsap.to(this.$store.state.scene.getObjectByName(this.obj).position, this.rotObj.pos)
    }
  }
}
