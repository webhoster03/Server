const Reload= async(req, res)=>{
    const data = req.body
    console.log("get")
    res.send(data)
}

module.exports = Reload