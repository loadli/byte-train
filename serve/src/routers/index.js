var router = require('koa-router')();

router.get('/', function *(next) {
  yield this.render('index', {
    title: '掘金前端日报'
  });
});

router.get('/news', function *(next) {
  yield this.render('news', {
    title: '掘金前端日报'
  });
});

module.exports = router;
