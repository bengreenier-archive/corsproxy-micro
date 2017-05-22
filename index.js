const urlutils = require('url')
const fetch = require('node-fetch')
const rateLimit = require('micro-ratelimit')

const DEFAULT_ALLOW_METHODS = [
  'POST',
  'GET',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS'
]

const DEFAULT_ALLOW_HEADERS = [
  'X-Requested-With',
  'Access-Control-Allow-Origin',
  'X-HTTP-Method-Override',
  'Content-Type',
  'Authorization',
  'Accept'
]

const handler = async (req, res) => {
    const corsHeaders = DEFAULT_ALLOW_HEADERS

    if (req.headers['x-accept-headers']) {
        corsHeaders.push(req.headers['x-accept-headers'].split(','))
    }
    
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Max-Age', 60 * 60 * 24)
    res.setHeader('Access-Control-Allow-Methods', DEFAULT_ALLOW_METHODS.join(','))
    res.setHeader('Access-Control-Allow-Headers', corsHeaders.join(','))
    res.setHeader('Access-Control-Allow-Credentials', 'true')

    if (req.method === 'OPTIONS') {
        return {}
    }

    const url = urlutils.parse(req.url)
    const remote = url.path.substr(1)
    const remoteUrl = urlutils.parse(remote)

    const headers = req.headers
    headers['host'] = remoteUrl.host + (remoteUrl.port ? `:${remoteUrl.port}` : '')
    delete headers['x-accept-headers']

    const response = await fetch(remoteUrl, {
        method: req.method,
        headers: req.headers
    })

    res.setHeader('Content-Type', response.headers.get('Content-Type'));
    res.end(await response.buffer())
}

module.exports = rateLimit(handler)