const { DownloadFolder } = require('../Controller/DownloadFolder')
const { FetchFolder, CreateFolder, DeleteFolder, getFolderSizeInMB } = require('../Controller/FolderController')
<<<<<<< HEAD
const { JWTVerify } = require('../Middlewares/AuthMiddleware');

const router=require('express').Router()

router.get('/fetch/*', JWTVerify, FetchFolder); // protected
router.post('/*', JWTVerify, CreateFolder); // protected
router.delete('/', JWTVerify, DeleteFolder); // protected
router.get('/download/*', JWTVerify, DownloadFolder); // protected
router.get('/size/*', JWTVerify, getFolderSizeInMB); // protected
=======

const router=require('express').Router()

router.get('/fetch/*',FetchFolder)//to fetch folder and list all files and folder under path
router.post('/*',CreateFolder)//to create new folder
router.delete('/',DeleteFolder)//delete folder and files under folder path
router.get('/download/*',DownloadFolder)//to download folder and files under folder path
router.get('/size/*',getFolderSizeInMB)//to get of folder path
>>>>>>> 6eb3537716774b5c66c33e1c6c01c7b1552be89e


module.exports=router