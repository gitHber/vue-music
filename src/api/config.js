export const commonParam = {
  g_tk: 67232076,
  inCharset: 'utf-8',
  outCharset: 'utf-8',
  notice: 0,
  format: 'jsonp'
}

export const options = {
  param: 'jsonpCallback'
}

export const http = {
  protocol: 'http',
  ip: 'localhost',
  port: 3000
}
export function getUrl(url) {
  return process.env.NODE_ENV === 'production' ? `${http.protocol}://${http.ip}:${http.port + url}` : url
}
export const ERR_OK = 0