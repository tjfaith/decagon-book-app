
import express from 'express';
import {getBooks} from '../controller/booksController'
import {adminData} from '../controller/authorController'
import {verifyToken} from '../middleware/auth'

const router = express.Router();

/* GET home page. */

  // res.render('index', { title: 'Express' });


  router.get('/', getBooks)
  router.get('/admin', verifyToken, adminData)

  // router.get('/',(req, res)=>{
  //   res.render('index', getBooks)
  // })

router.get('/signup', (req:express.Request, res:express.Response)=>{
  res.render('signup', {title:'signup'})
})

router.get('/login', (req, res)=>{
  res.render('login', {title:'login'})
})

router.get('/dashboard', (req, res)=>{
  res.render('dashboard', {title:"Author's Page"})
})
export default router;  
