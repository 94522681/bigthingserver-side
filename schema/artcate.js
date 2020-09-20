const joi=require('@hapi/joi')
const name=joi.string().required()
const alias=joi.string().alphanum().required()
const Id=joi.number().integer().required()
exports.add_artcate_schema={
    body:{
        name,
        alias,
    },
}
exports.del_artcate_schema={
    params:{
        Id
    }
}
exports.getid_artcate_schema={
    params:{
        Id
    }
}
exports.updateid_artcate_schema={
    body:{
        Id,
        name,
        alias,
    }
}