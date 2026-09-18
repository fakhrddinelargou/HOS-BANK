const isAuthenticated = (req, res, nex)=>{
    if(!req.session.userId){
        return res.status(401).json({
            message: "Vous devez etre connecté"
        })
    }

    next();
}

const authorizeRole = (...allowedRoles)=>{

    return (req, res, next)=>{

        const userRole = req.session.role;
        if(!allowedRoles.includes(userRole)){
            return res.status(403).json({
                message: "Accès interdit"
            })
        }
        next();
    }
}

module.exports = {
    isAuthenticated
}