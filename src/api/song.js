import {getUrl, commonParam} from './config'
import axios from 'axios'

/**
 * 通过songmid和vkey获取歌曲链接
 */
export function getVKey(songmid) {
  if (!songmid) return Promise.resolve('')
  const filename = `C400${songmid}.m4a`
  const guid = _getGuid()
  let url = getUrl('/api/getVKey')
  return axios.get(url, {
    params: {
      format: 'json',
      cid: 205361747,
      uin: 0,
      songmid: songmid,
      filename: filename,
      guid: guid
    }
  }).then(res => {
    let vkey = res.data.data.items[0].vkey
    return Promise.resolve(`http://dl.stream.qqmusic.qq.com/${filename}?vkey=${vkey}&guid=${guid}&uin=0&fromtag=66`)
  })
}
/**
 * 生成参数guid
 */
function _getGuid() {
  var t = (new Date()).getUTCMilliseconds()
  return Math.round(2147483647 * Math.random()) * t % 1e10
}

export function getLyric(mid) {
  const url = getUrl('/api/lyric')
  const data = Object.assign({}, commonParam, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 67232076,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}