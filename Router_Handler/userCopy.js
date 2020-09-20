const db = require('../db/index')
const bcrypt = require('bcryptjs')
var sql = async (userinfo, req, res) => {
    const sql = `select * from users where username= ?`
    var flag = 0
    await new Promise(
        () => {
            db.query(sql, [userinfo.username], (err, result) => {
                if (err) {
                    res.cc(err)
                    flag = 1
                }
                if (result.length > 0) {
                    flag = 1
                    console.log(flag + ' ' + '2');
                    res.cc('用户名被占用')
                }
            })
            return 11
        }
    )
    console.log(flag + ' ' + '1');
    return flag
}
const sql2 = (userinfo, req, res) => {
    const sql = `insert into users set ?`
    db.query(sql, {
        username: userinfo.username,
        password: userinfo.password
    }, (err, result) => {
        if (err) return res.cc(err)

        if (result.affectedRows !== 1) {
            return res.cc('注册用户失败')
        }
        res.send('注册成功')
    })
}
exports.regUser = (req, res) => {
    const userinfo = req.body
    //对表单中的数据进行合法性的验证
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或者密码不能为空')
    }
    console.log(userinfo);
    // console.log(sql(userinfo, req, res));
    if (sql(userinfo, req, res)) {
        return 0
    }
    // sql2(userinfo, req, res)
}
exports.login = (req, res) => {
    res.send('login giao')
}