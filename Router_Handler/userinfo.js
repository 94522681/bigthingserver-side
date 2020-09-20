const db = require('../db/index')
const bcrypt=require('bcryptjs')



exports.getUserInfo = (req, res) => {
    const sql = `select id,username,nickname,email,user_pic from users where id= ?`
    console.log(req.user.id);
    db.query(sql, req.user.id, (err, results) => {
        if (err) return res.cc(err)
        if (results.length !== 1) return res.cc('获取数据失败')
        res.send({
            status: 0,
            message: '获取数据成功',
            data: results[0]
        })
    })
}
exports.updateUserInfo = (req, res) => {
    console.log(2);
    const sql = `update users set ? where id=?`
    console.log(res.body);
    db.query(sql, [req.body, req.user.id], (err, results) => {
        console.log(results);
        if (err) return res.cc(err)
        if (results.affectedRows !== 1) return res.cc('更新数据失败')
        res.cc('修改用户信息成功', 0)
    })
}
exports.updatePassword = (req, res) => {
    //验证密码旧密码是否正确
    var str=`select * from users where id=?`
    db.query(str,req.user.id,(err,results)=>{
        if(err)return res.cc(err)
        if(results.length!=1) return res.cc('用户不存在')
        //验证密码
        const compareResult=bcrypt.compareSync(req.body.oldPwd,results[0].password)
        if(!compareResult){
            return res.cc('原始密码错误')
        }
        //加密新密码
        const newPwd=bcrypt.hashSync(req.body.newPwd,10)
        const sql = `update users set password= ? where id=?`
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err) return res.cc(err)
            if (results.affectedRows !== 1) return res.cc('更新数据失败')
            res.cc('更新密码成功', 0)
        })
    })
}
exports.updateAvatar=(req,res)=>{
    const sql='update users set user_pic=? where id= ?'
    db.query(sql,[req.body.avatar,req.user.id],(err,results)=>{
        if(err)return res.cc(err)
        if(results.affectedRows!=1) return res.cc('更新头像失败')
        return res.cc('更新头像成功',0)
    })
}