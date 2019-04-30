import { playMode } from 'common/js/config'
import { loadSearch } from 'common/js/cache'

const state = {
  singer: {},
  playing: false,
  fullScreen: false, //代表是否全屏
  playlist: [],  //播放列表 可能是循环播放列表 或者是随机播放列表 也可能是循环播放列表，用户通过更换播放模式播放列表顺序会发生变更
  sequenceList: [], //这个是有顺序的播放列表 比如点击播放器当前列表时所展示的播放列表数据
  mode: playMode.sequence,           //默认顺序播放
  currentIndex: -1,         //当前播放的歌曲
  disc: {},
  topList: [],
  searchHistory: loadSearch(), //搜索历史存储
  // disc: {},
  // topList: {},
  // playHistory: [],
  // favoriteList: []
}

export default state
