const expressRouterAdapter = (controller) => {
  return async (req, res) => {
    const request = {
      body: req.body,
      user_id: req.user_id,
      params: req.params,
      query: req.query,
    };

    const routeResponse = await controller.handle(request);
    if (routeResponse.statusCode >= 200 && routeResponse.statusCode <= 299) {
      res.status(routeResponse.statusCode).json(routeResponse.body);
    } else {
      res.status(routeResponse.statusCode).json({
        error: routeResponse.body,
      });
    }
  };
};

module.exports = expressRouterAdapter;
