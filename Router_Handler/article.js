const db=require('../db/index')
const path=require('path')
exports.addArticle=(req,res)=>{
    console.log(req.body);
    console.log(req.file);
    if(!req.file||req.file.fieldname!='cover_img') return res.cc('文章封面是必选')
    const articleInfo={
        ...req.body,
        cover_img:path.join('uploads',req.file.filename),
        pub_date:new Date(),
        author_id:req.user.id,
    }
    console.log(articleInfo);
    const sql=`insert into articles set ?`
    db.query(sql,articleInfo,(err,results)=>{
        if(err)return  res.cc(err)
        if(results.affectedRows!=1)return res.cc('发布文章失败')
        res.cc('发布文章成功',0)
    })
    // res.send('giao')
}
//根据id获取文章详情