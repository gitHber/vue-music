/**
* 此文件作为项目打包后的代理服务器，访问qq音乐的列表
*/
var express = require('express')
var app = express()
var router = express.Router()
var axios = require('axios')

router.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')
  res.header('Content-Type', 'application/json;charset=utf-8')
  next()
})

router.get('/api/getDiscList', function(req, res, next) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => console.log(e))
})

router.get('/api/getVKey', function(req, res, next) {
  // 获取歌曲链接中vkey
  var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => console.log(e))
})

app.get('/api/lyric', function(req, res) {
  // 获取歌曲链接中vkey
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var mathes = ret.match(reg)
      if (mathes) {
        ret = JSON.parse(mathes[1])
      }
    }
    res.json(ret)
  }).catch(e => console.log(e))
})

app.get('/api/recommendlist', function(req, res) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then(response => {
    res.json(response.data)
  }).catch(e => console.log(e))
})

app.use('/', router)
console.log('service start port:3000')
app.listen(3000)