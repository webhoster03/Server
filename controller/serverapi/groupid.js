const rndid= require("short-unique-id")
const getrndid= new rndid({length: 8})

const GroupId= (req, res)=>{
    res.send(JSON.stringify({status: true, groupId: getrndid.rnd()}))
}

module.exports = GroupId