const express = require('express');
const router = express.Router();
const IndexController = require('../controller/index.controller')
function processInvalid(req,res){
    res.json('Invalid!')
}
router.post('/', processInvalid);

router.get('/', processInvalid);

router.put('/', processInvalid);

router.delete('/', processInvalid);

router.post('/answer', IndexController.evalAndFetch);
module.exports = router;