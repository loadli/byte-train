var router = new (require('koa-router'))();
const newsService = require('../services/newsService');

router.get('/', function *(next) {
  const data = yield newsService.all()
  yield this.render('index', {
    title: '掘金前端日报',
    data,
  });
});

router.get('/news', function *(next) {
  const data = newsService.daily()
  yield this.render('news', {
    title: '掘金前端日报',
    data,
  });
});

module.exports = router;
