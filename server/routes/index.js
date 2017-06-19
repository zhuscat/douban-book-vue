const apiRouter = require('./api');
const renderRouter = require('./render');

module.exports = async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    await apiRouter.routes()(ctx, next);
  } else {
    await renderRouter(ctx, next);
  }
};
