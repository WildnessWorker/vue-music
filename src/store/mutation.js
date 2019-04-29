import * as type from './mutation-type.js'
const mutation = {
  [type.SET_SINGER](state, singer) { //第一个参数为获取state仓库的数据，第一个为mutation方法传递的参数
    state.singer = singer
  },
  [type.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [type.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [type.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [type.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [type.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [type.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [type.SET_DISC](state, disc) {
    state.disc = disc
  },
  [type.SET_TOP_LIST](state, topList) {
    state.topList = topList
  }
}
export default mutation
