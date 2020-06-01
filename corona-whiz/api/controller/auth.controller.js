function createSession(req, res) { 
    if(req.session.usn) {
        res.status(200).json('Success!');
        return
    }
    // console.log(req.body);
    
    if(req.body.usn.length && req.body.email.length ){
        req.session.usn = {
            usn: req.body.usn,
            email: req.body.email
        }
        req.session.save()
        res.status(200).json('Success!');
    } else {
        // console.log('here');
        
        res.status(403).json('Error!');
    }
    // console.log(req.session.usn);
}

function deleteSession(req, res){
    if(req.session.usn){
        req.session.destroy()
    }
    res.status(200).json('Success!');
}

module.exports = {
    createSession,
    deleteSession
}