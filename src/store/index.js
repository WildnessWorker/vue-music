import Vue from 'Vue'
import Vuex from 'vuex'
import * as actions from './actions.js' //import * as xxxxxxx 使用这个语法 就可以直接 getters.singer这样取到getter.js中的singer数据
import * as getters from './getters.js'
import state from './state.js'
import mutations from './mutation.js'
import createLogger from 'vuex/dist/logger' //vuex调试工具，当通过mutation修改state时控制台会抛出log日志

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production' //debug是vuex调试工具，如果state仓数据不是通过mutation修改的会报错开发环境下使用即可

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
