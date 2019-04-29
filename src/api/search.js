import axios from 'axios';
import jsonp from 'common/js/jsonp';
import {
  commonParams,
  options
} from './config'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  let data = Object.assign({}, commonParams, {
    gtk: '5381',
    plateform: 'h5',
    needNewCode: 1,
    notice: 0,
    uin: 0,
    format: 'json'
  })
  return jsonp(url, data, options)
}

export function search(query, page, zhida, perpage) {

  const data = Object.assign({}, commonParams, {
    w: query,
    p: page,
    catZhida: zhida ? 1 : 0,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    perpage,
    n: perpage,
    p: page,
    remoteplace: 'txt.mqq.all',
    uid: 0,
    needNewCode: 1,
    plateform: 'h5'
  })

  return axios.get('/api/search', {
    params: data,
  }).then(res => {
    return Promise.resolve(res.data)
  })
}
