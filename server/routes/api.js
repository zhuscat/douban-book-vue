const Router = require('koa-router');
const bookController = require('../controllers/book');
const tagController = require('../controllers/tag');

const router = new Router();

router.prefix('/api');

router.get('/books', bookController.getBooks);
router.get('/books/:tag', bookController.getBooksByTag);

router.get('/tags', tagController.getTags);

router.get('/v2/books', bookController.getBooks2);
router.get('/v2/books/:tag', bookController.getBooksByTag2);

module.exports = router;
