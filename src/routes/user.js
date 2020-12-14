const express = require('express')
const bcrypt = require('bcryptjs')
const { body, validationResult } = require('express-validator')
const User = require('../models/User')

const router = express.Router()

const validationSignUp = [
  body('email')
    .trim().isEmail().normalizeEmail().withMessage('Invalid Email!'),

  body('userName')
    .isLength({ min: 3, max: 25 }).withMessage('Username must contain betwen 3 to 25 chars max!'),

  body('password')
    .trim().isLength({ min: 6, max: 25 }).withMessage('Password must contain betwen 3 to 25 chars max!')
]

router.post('/signUp', validationSignUp, async (req, res) => {
  // global validation
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  // passwords matching validation
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).json({
      errors: [
        {
          value: `${req.body.confirmPassword}`,
          msg: 'Passwords dont mtachs!',
          param: 'confirmPassword',
          location: 'body'
        }
      ]
    })
  }

  // existence checking
  const {
    email,
    userName,
    password
  } = req.body

  try {
    const EmailCheck = await User.findOne({
      email
    })
    if (EmailCheck) {
      return res.status(400).json({
        errors: [
          {
            value: `${req.body.email}`,
            msg: 'Email Already In Use!',
            param: 'email',
            location: 'body'
          }
        ]
      })
    }

    const userNameCheck = await User.findOne({
      userName
    })
    if (userNameCheck) {
      return res.status(400).json({
        errors: [
          {
            value: `${req.body.userName}`,
            msg: 'UserName Already In Use!',
            param: 'userName',
            location: 'body'
          }
        ]
      })
    }

    const user = new User({
      email,
      userName,
      password
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password, salt)

    user.save()
      .then(() => {
        res.status(200).json({ message: 'user created' })
      })
      .catch((error) => {
        return res.status(400).json({
          errors: [
            {
              msg: `${error}`,
              location: 'database'
            }
          ]
        })
      })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
