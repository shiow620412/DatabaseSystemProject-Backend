import httpStatus from "http-status"
function APIError(message, error){
    return {
        message,
        status: httpStatus.BAD_REQUEST,
        isPublic: true,
        code: 400,
        stack: error.stack
    }
}
function MySQLError(message, error){
    return {
        message,
        status: httpStatus.INTERNAL_SERVER_ERROR,
        isPublic: true,
        code: 500,
        stack: error.stack
    }
}
export default {
    APIError,
    MySQLError
}