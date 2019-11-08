const express = require('express');
const proxy = require('express-http-proxy');
const app = express();
const PORT = 3000;

app.use(express.static(__dirname + '/../public'));

app.use('/images', proxy('http://fec-matt-dev.us-east-2.elasticbeanstalk.com/', {
  proxyReqPathResolver: function (req) {
    var path = req.url.split('/')[1];
    return `/images${path}`;
  }
}));

app.use('/reviews', proxy('http://3.17.191.227:3004/', {
  proxyReqPathResolver: function (req) {
    var path = req.url.split('/')[1];
    return `/reviews${path}`;
  }
}));

app.use('/ratings', proxy('http://3.17.191.227:3004/', {
  proxyReqPathResolver: function (req) {
    var path = req.url.split('/')[1];
    return `/ratings${path}`;
  }
}));

app.use('/description', proxy('http://ec2-54-173-118-85.compute-1.amazonaws.com', {
  proxyReqPathResolver: function (req) {
    var path = req.url.split('/')[1];
    console.log(`/description${path}`);
    return `/description${path}`;
  }
}));

app.use('/suggested', proxy('http://ec2-54-215-187-53.us-west-1.compute.amazonaws.com', {
  proxyReqPathResolver: function (req) {
    var path = req.url.split('/')[1];
    console.log(`/suggested${path}`);
    return `/suggested${path}`;
  }
}));

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});