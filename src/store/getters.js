export const singer = state => state.singer

export const singerId = state => state.singer.id

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const disc = state => state.disc

export const topList = state => state.topList

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const searchHistory = state => state.searchHistory

export const playHistory = state => state.playHistory
