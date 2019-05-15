import * as type from './mutation-type'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/until'
import {saveSearch, deleteSearch, clearSearch} from 'common/js/cache'

function findIndex(list, song) {
	return list.findIndex((item) => {
		return item.id === song.id
	})
} 

//一次性需要修改多个state数据时，所封装的mutations
export const selectPlay = function ({commit, state}, {list, index}) {
	commit(type.SET_SEQUENCE_LIST, list)
	if (state.mode === playMode.random) {
		let randomList = shuffle(list)
		commit(type.SET_PLAYLIST, randomList)
		index = findIndex(randomList, list[index])
	} else {
		commit(type.SET_PLAYLIST, list)
	}
	commit(type.SET_CURRENT_INDEX, index)
	commit(type.SET_FULL_SCREEN, true)
	commit(type.SET_PLAYING_STATE, true)
}

// 随机播放
export const randomPlay = function ({commit}, {list}){
  commit(type.SET_PLAY_MODE, playMode.random)
  commit(type.SET_SEQUENCE_LIST, list)
  let randomList =  shuffle(list)
  commit(type.SET_PLAYLIST, randomList)
  commit(type.SET_CURRENT_INDEX, 0)
  commit(type.SET_FULL_SCREEN, true)
  commit(type.SET_PLAYING_STATE, true)
}
//搜索之后选中一首歌曲，需要修改的state
export const insertSong = function ({commit, state}, song) {
	let playlist = state.playlist.slice()
	let sequenceList = state.sequenceList.slice()
	let currentIndex = state.currentIndex
	//记录当前歌曲
	let currentSong = playlist[currentIndex]
	//查找当前列表中是否已存在待插入的歌曲，如果有返回其索引
	let fpIndex = findIndex(playlist, song)
	//因为是插入歌曲， 所以索引+1
	currentIndex++
	//插入这首歌到当前索引位置
	playlist.splice(currentIndex, 0, song)
	//如果已经包含了这首歌就得先删掉
	if (fpIndex > -1) {
		//如果当前插入的歌曲的索引大于列表中已存在的索引
		if (currentIndex > fpIndex) {
			playlist.splice(fpIndex, 1)
			currentIndex--
		} else {
			playlist.splice(fpIndex + 1, 1)
		}
	}
	//找到歌曲被插入的位置
	let currentSIndex = findIndex(sequenceList, currentSong) + 1 

	let fsIndex = findIndex(sequenceList, song)

	sequenceList.splice(currentIndex, 0, song)

	if (fsIndex > -1) {
		if (currentSIndex > fsIndex) {
			sequenceList.splice(fsIndex, 1)
			// currentSIndex--
		} else {
			sequenceList.splice(fsIndex + 1, 1)
		}
	}

	commit(type.SET_PLAYLIST, playlist);
	commit(type.SET_SEQUENCE_LIST, sequenceList);
	commit(type.SET_CURRENT_INDEX, currentIndex);
	commit(type.SET_FULL_SCREEN, true);
	commit(type.SET_PLAYING_STATE, true);
}

//保存搜索历史记录
export const saveSearchHistory = function ({commit}, query) {
	commit(type.SET_SEARCH_HISTORY, saveSearch(query))
}

//删除历史搜索记录
export const deleteSearchHistory = function ({commit}, query) {
	commit(type.SET_SEARCH_HISTORY, deleteSearch(query))
}

//删除全部历史搜索记录
export const clearSearchHistory = function ({commit}) {
	commit(type.SET_SEARCH_HISTORY, clearSearch())
}