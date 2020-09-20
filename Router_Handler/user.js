const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt= require('jsonwebtoken')
const config=require('../schema/config')
const sql = (userinfo, req, res) => {
    const sql = `select * from users where username= ?`
    db.query(sql, [userinfo.username], (err, result) => {
        if (result.length > 0) {
            return res.cc('用户名被占用')
        }
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        sql2(userinfo, req, res)
    })
}
const sql2 = (userinfo, req, res) => {
    const sql = `insert into users set ?`
    db.query(sql, {
        username: userinfo.username,
        password: userinfo.password
    }, (err, result) => {
        if (result.affectedRows !== 1) {
            return res.cc('注册用户失败')
        }
        res.cc('注册成功',0)
    })
}
exports.regUser = (req, res) => {
    const userinfo = req.body
    console.log(userinfo);
    //检查重复姓名和插入姓名的操作
    sql(userinfo, req, res)
}
exports.login = (req, res) => {
    const userinfo=req.body
    console.log(req.body);
    var str=`select * from users where username=?`
    db.query(str,userinfo.username,(err,result)=>{
        console.log(result);
        if(err) return  res.cc(err)
        if(result.length!==1) return res.cc('登录失败')
        //判断密码是否在正确
        console.log(1);
        const compareResult=bcrypt.compareSync(userinfo.password,result[0].password)
        if(!compareResult){
            return res.cc('登录失败')
        }
        //生成jwt字符串
        const user={...result[0],password:'',user_pic:''}
        const tokenStr=jwt.sign(user,config.jwtSecretKey,{
            expiresIn: config.expiresIn
        })
        console.log(tokenStr);
        res.send({                                                                                                  
            status:0,
            message:'登录成功',
            token:'Bearer '+tokenStr
        })
    })
}