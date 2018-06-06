import * as type from './mutation-type'
//一次性需要修改多个state数据时，所封装的mutations
export const selectPlay = function ({commit, state}, {list, index}) {
	commit(type.SET_SEQUENCE_LIST, list)
	commit(type.SET_PLAYLIST, list)
	commit(type.SET_CURRENT_INDEX, index)
	commit(type.SET_FULL_SCREEN, true)
	commit(type.SET_PLAYING_STATE, true)
}
