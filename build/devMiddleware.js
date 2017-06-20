const devMiddleware = require('webpack-dev-middleware');

module.exports = (compiler, opts) => {
  const expressMiddleware = devMiddleware(compiler, opts);
  async function koaDevMiddleware(ctx, next) {
    await new Promise((resolve, reject) => {
      expressMiddleware(ctx.req, {
            end: (content) => {
              ctx.body = content;
              resolve();
            },
            setHeader: (name, value) => {
              ctx.set(name, value);
            },
          }, () => resolve(next()));
    });
  }
  koaDevMiddleware.fileSystem = expressMiddleware.fileSystem;
  return koaDevMiddleware;
};
