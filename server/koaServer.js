/**
* 此文件作为项目打包后的代理服务器，访问qq音乐的列表
*/
var Koa = require('koa')
var KoaRouter = require('koa-router')
var app = new Koa()
var router = new KoaRouter()
var cors = require('koa2-cors')
var axios = require('axios')

app.use(cors({
  origin: function (ctx) {
    return '*' // 允许来自所有域名请求

    // return 'http://localhost:8080'; / 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}))

// 我们可以用下面的中间件理解app.use(cors({}))
// app.use(async (ctx, next) => {
//   // 允许来自所有域名请求
//   ctx.set("Access-Control-Allow-Origin", "*");
//   // 这样就能只允许 http://localhost:8080 这个域名的请求了
//   // ctx.set("Access-Control-Allow-Origin", "http://localhost:8080");

//   // 设置所允许的HTTP请求方法
//   ctx.set("Access-Control-Allow-Methods", "OPTIONS, GET, PUT, POST, DELETE");

//   // 字段是必需的。它也是一个逗号分隔的字符串，表明服务器支持的所有头信息字段.
//   ctx.set("Access-Control-Allow-Headers", "x-requested-with, accept, origin, content-type");

//   // 服务器收到请求以后，检查了Origin、Access-Control-Request-Method和Access-Control-Request-Headers字段以后，确认允许跨源请求，就可以做出回应。

//   // Content-Type表示具体请求中的媒体类型信息
//   ctx.set("Content-Type", "application/json;charset=utf-8");

//   // 该字段可选。它的值是一个布尔值，表示是否允许发送Cookie。默认情况下，Cookie不包括在CORS请求之中。
//   // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
//   ctx.set("Access-Control-Allow-Credentials", true);

//   // 该字段可选，用来指定本次预检请求的有效期，单位为秒。
//   // 当请求方法是PUT或DELETE等特殊方法或者Content-Type字段的类型是application/json时，服务器会提前发送一次请求进行验证
//   // 下面的的设置只本次验证的有效时间，即在该时间段内服务端可以不用进行验证
//   ctx.set("Access-Control-Max-Age", 300);

//   /*
//   CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：
//       Cache-Control、
//       Content-Language、
//       Content-Type、
//       Expires、
//       Last-Modified、
//       Pragma。
//   */
//   // 需要获取其他字段时，使用Access-Control-Expose-Headers，
//   // getResponseHeader('myData')可以返回我们所需的值
//   ctx.set("Access-Control-Expose-Headers", "myData");
//   await next();
// })

router.get('/api/getDiscList', async function(ctx, next) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'
  await axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: ctx.request.query
  }).then(response => {
    ctx.body = response.data
  }).catch(e => console.log(e))
})

router.get('/api/getVKey', async function(ctx, next) {
  // 获取歌曲链接中vkey
  var url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  await axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: ctx.request.query
  }).then(response => {
    ctx.body = response.data
  }).catch(e => console.log(e))
})
router.get('/api/lyric', async function(ctx, next) {
  // 获取歌曲链接中vkey
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
  await axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: ctx.request.query
  }).then(response => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var mathes = ret.match(reg)
      if (mathes) {
        ret = JSON.parse(mathes[1])
      }
    }
    ctx.body = ret
  }).catch(e => console.log(e))
})
router.get('/api/recommendlist', async function(ctx, next) {
  var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
  await axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: ctx.request.query
  }).then(response => {
    ctx.body = response.data
  }).catch(e => console.log(e))
})

app.use(router.routes()).use(router.allowedMethods())
console.log('service start port:3000')
app.listen(3000)