var router = require('koa-router')();

router.get('/', function *(next) {
  yield this.render('index', {
    title: 'Hello World Koa!'
  });
});

router.get('/news', function *(next) {
  yield this.render('news', {
    title: 'Hello World foo!'
  });
});

module.exports = router;
