import { playMode } from 'common/js/config'
import { loadSearch } from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false, //代表是否全屏
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,           //默认顺序播放
  currentIndex: -1,         //当前播放的歌曲
  // disc: {},
  // topList: {},
  // searchHistory: loadSearch(),
  // playHistory: [],
  // favoriteList: []
}

export default state
