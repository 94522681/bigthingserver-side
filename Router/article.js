const express=require('express')
const router=express.Router()
const article_handle=require('../Router_Handler/article')
//使用express.urlencoded()中间件无法解析multipart/form-data格式的请求的额请求体
const multer=require('multer')
const expressjoi=require('@escook/express-joi')
const path=require('path')
const { add_article_schema } = require('../schema/article')
const upload=multer({dest:path.join(__dirname,'../uploads')})

router.post('/add',upload.single('cover_img'),expressjoi(add_article_schema),article_handle.addArticle)
module.exports=router