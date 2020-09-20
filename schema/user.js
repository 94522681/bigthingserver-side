const joi = require('@hapi/joi')
const username = joi.string().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()
const email = joi.string().email().required()
const nickname = joi.string().required().pattern(/^[\S]{2,15}$/)
const avatar = joi.string().dataUri().required()
const id=joi.string()
exports.reg_login_schema = {
    body: {
        username,
        password,
    }
}
exports.reg_userinfo_schema = {
    body: {
        email,
        nickname,
        username,
        id
    }
}
exports.update_password_schema = {
    body: {
        oldPwd: password,
        newPwd: joi.not(joi.ref('oldPwd')).concat(password)
    }
}
exports.update_avatar_schema = {
    body: {
        avatar
    }
}