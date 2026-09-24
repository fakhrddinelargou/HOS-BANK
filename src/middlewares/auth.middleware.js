const isAuthenticated = (req, res, next)=>{
    if(!req.session.userId){
        return res.status(401).json({
            message: "Vous devez etre connecté"
        })
    }

    next();
}




module.exports = {
    isAuthenticated
}