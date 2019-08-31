/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Employees = mongoose.model('Employees');

router.post('/', auth.optional, (req, res, _next) => {
  const {
    body: { employee },
  } = req;

  if (employee.id) {
    Employees.findById(employee.id, (err, p) => {
      if (!p) {
        return res.sendStatus(400);
      }
      p.email = employee.email;
      p.name = employee.name;
      p.department = employee.department;
      p.position = employee.position;
      p.assign = employee.assign;
      p.save().then(() => res.json({ employee: p }));
    });
  } else {
    if (!employee.email) {
      return res.status(422).json({
        errors: {
          email: 'is required',
        },
      });
    }

    if (!employee.name) {
      return res.status(422).json({
        errors: {
          name: 'is required',
        },
      });
    }

    if (!employee.department) {
      return res.status(422).json({
        errors: {
          department: 'is required',
        },
      });
    }

    if (!employee.position) {
      return res.status(422).json({
        errors: {
          position: 'is required',
        },
      });
    }

    const finalEmployee = new Employees(employee);

    return finalEmployee
      .save()
      .then(() => res.json({ employee: finalEmployee }));
  }
});

router.get('/', auth.optional, (req, res, _next) =>
  Employees.findById(req.query.id).then(employee => {
    if (!employee) {
      return res.sendStatus(400);
    }

    return res.json({ employee });
  }),
);

router.get('/current', auth.optional, (req, res, _next) =>
  Employees.find().then(employees => {
    if (!employees) {
      return res.sendStatus(400);
    }

    return res.json({ employees });
  }),
);

module.exports = router;
