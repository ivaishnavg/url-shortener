// const sessionIdtoUsermap = new Map()
const jwt = require("jsonwebtoken")
const secret = "vag@exaple1"


function setUser(user){
    // return sessionIdtoUsermap.set(id, user)
    return jwt.sign({
        id : user._id,
        email : user.email
    }, secret)
}

function getUser(token){
    if(!token) return null
    const a = jwt.verify(token, secret)
    console.log(a)
    return a
}

module.exports={setUser,getUser}