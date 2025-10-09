const { validationResult } = require("express-validator");

const Signup= async(req,res)=>{
    const data= req.body
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(202).json({ error: error.array() })
    }

    console.log(data)
    res.send(data)
}

module.exports=Signup

