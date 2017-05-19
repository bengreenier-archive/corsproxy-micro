const urlutils = require('url')
const fetch = require('node-fetch')
const microCors = require('micro-cors')
const rateLimit = require('micro-ratelimit')

const cors = microCors()
const handler = async (req, res) => {
    const url = urlutils.parse(req.url)
    const remote = url.path.substr(1)
    const remoteUrl = urlutils.parse(remote)

    const headers = req.headers
    headers['host'] = remoteUrl.host + (remoteUrl.port ? `:${remoteUrl.port}` : '')

    const response = await fetch(remoteUrl, {
        method: req.method,
        headers: req.headers
    })

    res.setHeader('Content-Type', response.headers.get('Content-Type'));
    res.end(await response.buffer())
}

module.exports = cors(rateLimit(handler))