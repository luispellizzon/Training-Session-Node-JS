const {UnauthorizedError,ServerError} = require("../errors") 

const badRequest = (e) => ({
  statusCode: 400,
  body: e
})
  
const unauthorized = () => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

const forbidden = (e) => ({
  statusCode: 403,
  body: e,
})
  
const notFound = (e) => ({
    statusCode: 404,
    body: e
})
  
const serverError = (e) => ({
  statusCode: 500,
  body: new ServerError(e.stack)
})
  
  
const noContent = () => ({
  statusCode: 204,
  body: null,
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