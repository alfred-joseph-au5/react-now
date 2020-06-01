function BasicAuth(req, res, next) {
    if(req.session.usn){
        // console.log('Logged In');        
        next();
    } else {
        res.status(403).json("Not Authenticated!");
    }
};

module.exports = BasicAuth;