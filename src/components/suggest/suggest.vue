<template>
  <scroll class="suggest" 
    :data="result" 
    :pullup="pullup"
    :beforeScroll="beforeScroll"
    @scrollToEnd="searchMore"
    @beforeScroll="listScroll"
    ref="suggest"
  >
    <ul class="suggest-list">
      <li 
        class="suggest-item" 
        v-for="(item, index) of result" :key="index"
        @click="selectItem(item)"
      >
        <div class="icon">
          <i :class="getIconCls(item)"></i>
        </div>
        <div class="name">
          <p class="text" v-html="getDisplayName(item)"></p>
        </div>
      </li>
      <loading v-show="hasMore" title=""></loading>
    </ul>
    <div v-show="!hasMore && !result.length" class="no-result-wrapper">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div>
  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { search } from "api/search"
import {ERR_OK} from 'api/config'
import { createSong, isValidMusic, processSongsUrl } from 'common/js/song'
import NoResult from 'base/no-result/no-result'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'
import {mapMutations, mapActions} from 'vuex'

const TYPE_SINGER = 'singer'
const PERPAGE = 20

export default {
  props: {
    query: {
      type: String,
      default: ""
    },
    showSinger: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      page: 1,
      result: [],
      pullup: true,
      hasMore: true,
      beforeScroll: true
    };
  },
  methods: {
    //处理搜索返回的数据
    _validateData(data) {
      if(!data) {
        return
      }
      const len = data.length;
      return JSON.parse(data.substring(9, len - 1));
    },
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.zhida_singer.singerName
      } else {
        return `${item.name}-${item.singer}`
      }
      
    },
    getIconCls(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      }else {
        return 'icon-music'
      }
    },
    search() {
      this.page = 1
      this.hasMore = true
      this.$refs.suggest.scrollTo(0, 0)
      search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
        const list = this._validateData(res);
        if (list.data) {
          this._genResult(list.data).then((result) => {
            this.result = result
          })
          this._checkMore(list.data)
        }
      })
    },
    searchMore () {
      if (!this.hasMore) {
        return 
      }
      this.page ++
      search(this.query, this.page, this.showSinger, PERPAGE).then((res) => {
        const data = this._validateData(res)
        this._genResult(data.data).then((result) => {
          this.result = this.result.concat(result)
        })
        this._checkMore(data.data)
      })
    },
    listScroll() {
      this.$emit('listScroll')
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * PERPAGE) > song.totalnum) {
        this.hasMore = false
      }
    },
    _genResult (data) {
      console.log(data)
      let ret = []
      // if (data.zhida && data.zhida.singerid) {
      if (data.zhida && data.zhida.zhida_singer && data.song.curpage === 1) {
        ret.push({...data.zhida, ...{type: TYPE_SINGER}})
      }
      return processSongsUrl(this._normalizeSongs(data.song.list)).then((songs) => {
        ret = ret.concat(songs)
        return ret
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData))
        }
      })
      return ret 
    },
    selectItem (item) {
      if (item.type === TYPE_SINGER) {
        const singer = new Singer({
          id: item.singermid,
          name: item.singername
        })
        this.$router.push({
          path: `/search/${singer.id}`
        })
        this.setSinger(singer)
      } else {
        this.insertSong(item)
      }
      this.$emit('select')
    },
    
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    ...mapActions([
      'insertSong'
    ])
  },
  watch: {
    query(newQuery) {
      if (!newQuery) {
        return 
      }
      this.search(newQuery)
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

