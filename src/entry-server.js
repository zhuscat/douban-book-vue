import createApp from './app';

/* eslint-disable */
export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp();

    console.log(`这是同构代码哦, ${context.url}`);

    router.push(context.url);

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents();
      if (!matchedComponents.length) {
        reject({ code: 404 });
      }

      Promise.all(matchedComponents.map(Component => {
        if (Component.asyncData) {
          return Component.asyncData({
            store,
            route: router.currentRoute,
          });
        }
      })).then(() => {
        context.state = store.state;
        resolve(app);
      }).catch(reject);
    }, reject);
  });
};
