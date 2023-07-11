const state = {
  show: false,
  message: '',
  color: '',
  timeout: 3000,
  y: 'top'
}

const getters = {
  snackbar (state) {
    return state
  }
}

const mutations = {
  showSnackbar (state, payload) {
    state.show = true
    state.message = payload.message
    state.color = payload.color
    state.timeout = payload.timeout || 3000
    state.y = payload.y || 'top'
  },

  hideSnackbar (state) {
    state.show = false
  }
}

const actions = {
  showSnackbar ({ commit }, payload) {
    commit('showSnackbar', payload)
    setTimeout(() => {
      commit('hideSnackbar')
    }, payload.timeout || 3000)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
