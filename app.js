// 导入模块区域
const express = require('express')
const app = express()
//解决跨域问题吗, 安装cors
const cors = require('cors')
const Joi = require('@hapi/joi')
const config=require('./schema/config')
const expressJWT=require('express-jwt')
const userRouter = require('./Router/user')
const userinfoRouter=require('./Router/userinfo')
const artcateRouter=require('./Router/artcate')
const articleRouter=require('./Router/article')

// 导入中间件区域
app.use(cors())
//配置解析表单数据的中间件
app.use(express.urlencoded({
    extended: false
}))
//响应数据的中间件
app.use(function (req, res, next) {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

app.use('/uploads',express.static('./uploads'))
// 导入路由模块,并加入全局中间件

//使用unless指定哪些接口不需要Token的身份认证
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api\//]}))
//配置路由
app.use('/api', userRouter)
app.use('/my',userinfoRouter)
app.use('/my/article',artcateRouter)
app.use('/my/article',articleRouter)
app.use((err, req, res, next) => {
    if (err instanceof Joi.ValidationError) {
        return res.cc(err)
    }
    if(err.name==='UnauthorizedError')return res.cc('身份认证失败')
    res.cc(err)
})
//监听端口
app.listen(1001, () => {
    console.log('服务器启动成功');
})