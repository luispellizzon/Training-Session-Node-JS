const {UnauthorizedError,ServerError} = require("../errors") 

const badRequest = (e) => ({
  statusCode: 400,
  body: e
})
  
const unauthorized = () => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

const forbidden = (e, headers) => ({
  statusCode: 403,
  body: e,
  headers
})
  
const notFound = (e) => ({
    statusCode: 404,
    body: e
})
  
const serverError = (e) => ({
  statusCode: 500,
  body: new ServerError(e.stack)
})
  
  
const noContent = (headers) => ({
  statusCode: 204,
  body: null,
  headers
})

const success = (data) => ({
  statusCode: 200,
  body:data
})

module.exports = {
  badRequest,
  serverError,
  success,
  noContent,
  notFound,
  forbidden,
  unauthorized
}