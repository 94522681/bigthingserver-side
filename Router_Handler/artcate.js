//链接数据库

const db = require('../db/index')
//查询文章分类
exports.getArticleCates = (req, res) => {
    const sql = `select * from article_cate where is_delete=0 order by id asc`
    db.query(sql, (err, result) => {
        if (err) return res.cc(err)
        res.send({
            status: 0,
            message: "获取文章分类成功",
            data: result
        })
    })
}
//新增文章分类
exports.addArticleCates = (req, res) => {
    //查一下分类名称有没有重复
    const sql = `select * from article_cate where name=? or alias=?`
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {
        if (err) return res.cc(err)
        if (result.length > 0) return res.cc('分类名称或别名被占用了,请更换重试')
        //新增文章分类
        const str = `insert into article_cate set ?`
        db.query(str, req.body, (err, result) => {
            if (err) return res.cc(err)
            if(result.affectedRows!=1) res.cc('新增文章分类失败')
            res.cc('新增文章分类成功',0)
        })
    })
    // res.send('ok')
}
//删除文章分类 
exports.delArticleCates=(req,res)=>{
    const sql=`update article_cate set is_delete=1 where id=?`
    db.query(sql,req.params.Id,(err,result)=>{
        if (err) return res.cc(err)
        if(result.affectedRows!=1) res.cc('删除文章分类失败')
        res.cc('删除文章分类成功',0)
    })
}
exports.getArticleCatesById=(req,res)=>{
    const sql=`select * from article_cate where id=?`
    db.query(sql,req.params.Id,(err,result)=>{
        if (err) return res.cc(err)
        if(result.length!=1) res.cc('获取分类数据失败')
        res.send({
            status:0,
            message:'获取分类数据成功',
            data:result[0]
        })
    })
}
//根据id更新文章类别
exports.updateArticleCatesById=(req,res)=>{
    const str=`select * from  article_cate where Id!=? and (name=? or alias=?)`
    console.log(req.body);
    db.query(str,[req.body.Id,req.body.name,req.body.alias],(err,result)=>{
        if (err) return res.cc(err)
        if (result.length > 0) return res.cc('分类名称或别名被占用了,请更换重试')
        const sql=`update article_cate set name=?,alias=? where id=?`
        db.query(sql,[req.body.name,req.body.alias,req.body.Id],(err,result)=>{
            if (err) return res.cc(err)
            console.log(result.affectedRows);
            if(result.affectedRows!=1) return res.cc('更新文章分类失败')
            return res.cc('更新文章分类成功',0)
        })
    })
}
