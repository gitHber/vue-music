// import jsonp from 'common/js/jsonp'
// import {commonParam, options} from './config'
import axios from 'axios'

export function getVKey(songmid) {
  if (!songmid) return Promise.resolve('')
  const filename = `C400${songmid}.m4a`
  const guid = _getGuid()
  return axios.get('/api/getVKey', {
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

function _getGuid() {
  var t = (new Date()).getUTCMilliseconds()
  return Math.round(2147483647 * Math.random()) * t % 1e10
}