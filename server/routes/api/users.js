/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

router.post('/', auth.optional, (req, res, _next) => {
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser
    .save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

router.post('/login', auth.optional, (req, res, next) => {
  const {
    body: { user },
  } = req;
  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate(
    'local',
    { session: false },
    (err, passportUser, _info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const user = passportUser;
        user.token = passportUser.generateJWT();
        return res.json({ user: user.toAuthJSON() });
      }

      return res.status(422).json({
        errors: {
          stauts: 'not match',
        },
      });
    },
  )(req, res, next);
});

router.get('/current', auth.required, (req, res, _next) => {
  const {
    payload: { id },
  } = req;

  return Users.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
  });
});

router.get('/logout', auth.optional, function(req, res) {
  req.logout();
  req.session.destroy(function (err) {
    res.json({ status: true });
  });
});

module.exports = router;
