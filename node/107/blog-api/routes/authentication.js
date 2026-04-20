import express from 'express';
import bcrypt from 'bcrypt';


const router = express.Router();


router.use(async (req, res, next) => {
  try {
    req.users = await req.db.collection('users');


    next();
  } catch (e) {
    next(e);
  }
});


router.get('/', async (req, res, next) => {
  try {
    const result = await req.users.findOne({userName: req.body.userName});


    if (result) {
      if (await bcrypt.compare(req.body.password, result.hash)) {
        req.session.userName = req.body.userName;
        res.sendStatus(204);
      }
    }


    const error = new Error('Invalid username and/or password');
    error.statusCode = 401;
    throw(error);
  } catch (e) {
    next(e);
  }
});


router.post('/logout', (req, res, next) => {
  req.session.destroy();
  res.sendStatus(204);
});


router.post('/register', async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);


    const results = await req.users.insertOne({ userName: req.body.userName, hash })


    console.log(results);


    res.sendStatus(201);
  } catch (e) {
    console.log(e);


    if (e.errorResponse.code === 11000) {
      return next(new Error(`Username ${req.body.userName} already in use. Please choose another`));
    }


    next(e);
  }
});


export default router;
