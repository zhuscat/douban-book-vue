const hotMiddleware = require('webpack-hot-middleware');
const { PassThrough } = require('stream');

module.exports = (compiler, opts) => {
  const expressMiddleware = hotMiddleware(compiler, opts);
  async function koaHotMiddleware(ctx, next) {
    await new Promise((resolve) => {
      expressMiddleware(ctx.req, ctx.res, () => resolve(next()));
    });
  }
  return koaHotMiddleware;
};
