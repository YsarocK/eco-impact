import axios from 'axios'
import { mapMutations } from 'vuex'
import gsap from 'gsap'

export default {
  data () {
    return {
      inputUrl: '',
      loading: false,
      imgLoaded: false
    }
  },
  methods: {
    getImg () {
      axios.get('https://api-etiennemoureton.herokuapp.com/img/' + this.inputUrl + '.png')
        .then(() => {
          this.imgLoaded = true
          this.UPDATE_PLANE()
        })
        .catch(() => {
          if (this.imgLoaded === false) {
            setTimeout(this.getImg(), 1000)
          }
        })
    },
    handleInput () {
      this.UPDATE_SCORE({ score: 0 })
      this.imgLoaded = false
    },
    ...mapMutations(['UPDATE_URL', 'UPDATE_SCORE', 'UPDATE_PLANE']),
    handleForm (e) {
      this.UPDATE_URL({ url: this.inputUrl })
      this.loading = true
      axios({
        method: 'get',
        // url: 'http://localhost:5000/?url=' + this.inputUrl,
        url: 'https://api-etiennemoureton.herokuapp.com/?url=' + this.inputUrl,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((r) => {
          this.loading = false
          this.UPDATE_SCORE({ score: r.data })
          // gsap.to(this.$store.state.scene.getObjectByName('group').position, { duration: 3, y: 0.6 })
          gsap.to(this.$store.state.scene.getObjectByName('group').rotation, { duration: 3, y: -0.7, x: 0.2 })
          document.getElementById('video').play()
        })
      e.preventDefault()
      this.getImg()
    }
  }
}
