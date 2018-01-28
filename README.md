# Artgag

Project for TAS classes. It includes a server with RESTful API created with Node.js and the frondend part made with ReactJS. Site is similar to 9gag of course with less features.

Things done:

- Login with token authorization
- Post upload throught api to amazon s3 server // changed to imgur
- Adding comments, deleting and editing comments
- Rating
- Simple ranking with sorting

Things to do:

- Improve ranking
- User profiles site
- Admin site

## Getting started

Before installing any modules first you need to generate your auth key for [imgur account](https://apidocs.imgur.com/#a062733d-ef42-3741-8521-b06e9b3310d2) and set the address to your server.

#### src/adds/API-calls.js

```
const URL = 'server url';
```

#### server/controlers/posts-controller.js

```
 const options = {
    "baseURL": 'https://api.imgur.com',
    "headers": {
      "Authorization": "Bearer {{auth key}}"
    }
  }
```

## Author

**Łukasz Nojman** [mighty-titan](https://github.com/mighty-titan)

## License

This project is licensed under the MIT License