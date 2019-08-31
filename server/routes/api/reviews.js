/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Reviews = mongoose.model('Reviews');
const Employees = mongoose.model('Employees');

router.post('/', auth.optional, (req, res, _next) => {
  const {
    body: { review },
  } = req;

  if (review.id) {
    Reviews.findById(review.id, (err, p) => {
      if (!p) {
        return res.sendStatus(400);
      }

      p.content = review.content;

      Employees.findOne({
        email: review.auth,
      }).then(employee => {
        if (employee) {
          // eslint-disable-next-line no-underscore-dangle
          p.updateBy = employee._id;
        }
      });

      delete review.author;
      p.save().then(() => res.json({ review: p }));
    });
  } else {
    if (!review.employeeId) {
      return res.status(422).json({
        errors: {
          employeeId: 'is required',
        },
      });
    }

    if (!review.content) {
      return res.status(422).json({
        errors: {
          content: 'is required',
        },
      });
    }

    if (!review.author) {
      return res.status(422).json({
        errors: {
          author: 'is required',
        },
      });
    }

    Employees.findOne({
      email: review.author,
    }).then(employee => {
      if (employee) {
        // eslint-disable-next-line no-underscore-dangle
        review.createBy = employee._id;
        employee.assign = '';
        employee.save().then(() => console.log('delete assign'));
      }
    });

    delete review.author;

    const finalReview = new Reviews(review);

    return finalReview.save().then(() => res.json({ review: finalReview }));
  }
});

router.get('/', auth.optional, (req, res, _next) =>
  Reviews.find({
    employeeId: req.query.id,
  }).then(reviews => {
    if (!reviews) {
      return res.sendStatus(400);
    }

    return res.json({ reviews });
  }),
);

router.get('/remain', auth.optional, (req, res, _next) => {
  Employees.findOne({
    email: req.query.email,
  }).then(employee => {
    if (employee && employee.assign) {
      Employees.find({
        _id: employee.assign,
      }).then(employeeTask => {
        if (employeeTask) {
          return res.json({ employees: employeeTask });
        }
      });
    } else {
      return res.json({ employees: [] });
    }
  });
});

module.exports = router;
