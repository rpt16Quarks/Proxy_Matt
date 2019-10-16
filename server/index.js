const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/../public'));

app.use('/images', proxy('http://localhost:3003', {
  proxyReqPathResolver: function (req) {
    var path = req.url.split('/')[1];
    return `/images${path}`;
  }
}));

app.use('/reviews', proxy('http://localhost:3004', {
  proxyReqPathResolver: function (req) {
    var path = req.url.split('/')[1];
    return `/reviews${path}`;
  }
}));

app.use('/description/:id', proxy('http://localhost:3005', {
  proxyReqPathResolver: function (req) {
    var path = req.url.split('/')[1];
    console.log(`/description${path}`);
    return `/description${path}`;
  }
}));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});