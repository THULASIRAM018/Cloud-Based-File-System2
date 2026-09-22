const { addToStarred, getStarredFiles, removeFromStarred } = require('../Controller/StarredContoller')
<<<<<<< HEAD
const { JWTVerify } = require('../Middlewares/AuthMiddleware');
=======
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e

const router=require('express').Router()


<<<<<<< HEAD
router.post('/', JWTVerify, addToStarred); // protected
router.get('/:userName', JWTVerify, getStarredFiles); // protected
router.delete('/:id', JWTVerify, removeFromStarred); // protected
=======
router.post('/',addToStarred)//put to starred
router.get('/:userName',getStarredFiles)//fetch starred
router.delete('/:id',removeFromStarred)//remove from starred
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e

module.exports=router