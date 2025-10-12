const Verification=(req, res)=>{
    const data= Object.assign({}, req.query)
    const mail= data.mail
    const token = data.token
    const key= data.key

    



    res.end("get")
}

module.exports= Verification