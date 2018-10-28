import express from 'express';

// const router = express.Router();

const app = express();

const users = [
  {
    username: 'admin',
    password: 'computer',
    priviledge: 1,
  },
  {
    username: 'sam',
    password: 'computer1',
    priviledge: 0,
  },
];

const myLoger = app.post((req, res, next) => {
  // const checkUser = users.find(user => user.username === req.body.username);
  // if (checkUser) {
  //   if (checkUser.password === req.body.password) {
  //     if (checkUser.priviledge === 1) {
  //       return res.send('Admin route access granted');
  //     }
  //     return res.send('Admin route access not granted');
  //   }
  //   return res.send(`Wrong password: ${req.body.password} entered`);
  // }
  // res.send(`${req.body.username} not found`);
  res.send('Hi');

  next();
});


module.exports = myLoger;
