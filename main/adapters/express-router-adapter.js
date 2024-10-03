const expressRouterAdapter = (controller) => {
    return async(req, res) => {
        const request = {
            body: req.body
        }

        const routeResponse = await controller(request)
        if (routeResponse.statusCode >= 200 && routeResponse.statusCode <= 299) {
            res.status(routeResponse.statusCode).json(routeResponse.body)
        } else {
            res.status(routeResponse.statusCode).json({
                error: routeResponse.body
            })
        }

    }
}

module.exports = expressRouterAdapter