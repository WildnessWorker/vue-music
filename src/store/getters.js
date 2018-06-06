export const singer = state => state.singer

export const singerId = state => state.singer.id

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  console.log(state.currentIndex)
  return state.playlist[state.currentIndex] || {}
}