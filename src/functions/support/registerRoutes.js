import controller from './createController';

export const registerRoutes = ({ basePath, router, routes }) => {
  if (routes) {
    const routerInstance = router;
    
    routes.map((route) => {
      const { path, controller: controllerPath } = route;

      if (routerInstance) {
        routerInstance.use(`${basePath}/${path}`, controller(controllerPath).router);
      }
    });
  }
};