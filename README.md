# corsproxy-micro

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/bengreenier/corsproxy-micro)

A microservice (:microscope: :cloud:) that acts as a permissive CORS proxy.

## How?

> Note: the incoming requests `Host` header will be ignored, and the proxied request will have a `Host` header containing the host as parsed from the url.

```
GET /http://usernames.io/new HTTP/1.1
Host: localhost:3000
```

=>

```
HTTP/1.1 200 OK
Access-Control-Max-Age: 86400
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST,GET,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: X-Requested-With,Access-Control-Allow-Origin,X-HTTP-Method-Override,Content-Type,Authorization,Accept
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
Date: Fri, 19 May 2017 21:06:53 GMT
Connection: keep-alive
Content-Length: 119

{"username":"RottenAnt","availability":{"github":true,"dot-com":false,"twitter":true,"linkedin":false,"facebook":true}}
```

or (supporting non-standard cors headers by request)

```
GET /http://usernames.io/new HTTP/1.1
Host: localhost:3000
X-Accept-Headers: X-Nonstandard-Header
```

=>

```
HTTP/1.1 200 OK
Access-Control-Max-Age: 86400
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST,GET,PUT,DELETE,OPTIONS
Access-Control-Allow-Headers: X-Requested-With,Access-Control-Allow-Origin,X-HTTP-Method-Override,Content-Type,Authorization,Accept,X-Nonstandard-Header
Access-Control-Allow-Credentials: true
Content-Type: application/json; charset=utf-8
Date: Fri, 19 May 2017 21:06:53 GMT
Connection: keep-alive
Content-Length: 119

{"username":"RottenAnt","availability":{"github":true,"dot-com":false,"twitter":true,"linkedin":false,"facebook":true}}
```

## License

MIT