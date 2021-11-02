import { BoxGeometry } from 'three'
import { VideoTexture, Group, Scene, PerspectiveCamera, WebGLRenderer, Color, PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, TextureLoader } from 'three'

export const state = () => ({
  width: 0,
  height: 0,
  camera: null,
  scene: null,
  renderer: null,
  mouseMove: false,
  url: 'edt',
  score: 0
})

export const mutations = {
  UPDATE_SCORE (state, { score }) {
    state.score = score
  },

  UPDATE_URL (state, { url }) {
    state.url = url
  },

  SET_VIEWPORT_SIZE (state, { width, height }) {
    state.width = width
    state.height = height
  },

  INITIALIZE_RENDERER (state, el) {
    state.renderer = new WebGLRenderer({ antialias: true })
    state.renderer.setPixelRatio(window.devicePixelRatio)
    state.renderer.setSize(state.width, state.height)
    el.appendChild(state.renderer.domElement)
  },

  INITIALIZE_CAMERA (state) {
    state.camera = new PerspectiveCamera(40, state.width / state.height, 1, 1000)
    state.camera.position.z = 3
  },

  INITIALIZE_SCENE (state) {
    state.scene = new Scene()
    state.scene.background = new Color(0x000000)
  },

  RESIZE (state, { width, height }) {
    state.width = width
    state.height = height
    state.camera.aspect = width / height
    state.camera.updateProjectionMatrix()
    state.renderer.setSize(width, height)
    state.renderer.render(state.scene, state.camera)
  },

  ADD_PLANE (state) {
    // FIRST PLANEg
    const geometry = new PlaneGeometry(1, 1, 1)
    const material = new MeshBasicMaterial({ color: 0xFF0000 })
    const mesh = new Mesh(geometry, material)
    mesh.name = 'myCube'

    // BCKGROUND SCENE
    const geometry2 = new BoxGeometry(1, 1, 1)
    const video = document.getElementById('video')
    const videoTexture = new VideoTexture(video)
    const material2 = new MeshBasicMaterial({ map: videoTexture })
    const mesh2 = new Mesh(geometry2, material2)
    mesh2.name = 'myCube2'
    mesh2.position.z = -2

    const group = new Group()
    group.add(mesh2)
    group.add(mesh)
    group.name = 'group'
    state.scene.add(group)
  },

  UPDATE_PLANE (state) {
    console.log(state.scene.getObjectByName('myCube'))
    const texture = new TextureLoader().load('http://localhost:5000/img/' + state.url + '.png')
    const materialArray = new MeshBasicMaterial({ map: texture, transparent: true, side: DoubleSide })
    state.scene.getObjectByName('myCube').material = materialArray
    state.renderer.render(state.scene, state.camera)
    console.log(state.scene.getObjectByName('myCube'))
  },

  RERENDER (state) {
    state.renderer.render(state.scene, state.camera)
  }
}

export const actions = {
  INIT ({ state, commit }, { width, height, el }) {
    return new Promise((resolve) => {
      commit('SET_VIEWPORT_SIZE', { width, height })
      commit('INITIALIZE_RENDERER', el)
      commit('INITIALIZE_CAMERA')
      commit('INITIALIZE_SCENE')
      commit('ADD_PLANE')
      resolve()
      const update = () => {
        commit('RERENDER')
        window.requestAnimationFrame(update)
      }
      update()
    })
  }
}

export const strict = false
