const { getAllUsers,getUserByEmail, deleteUser } = require('../controllers/user.controller');

const express = require('express')
const router = require('express').Router();

router.use(express.json());

router.route('/').get(getAllUsers);
router.route('/:email').get(getUserByEmail).delete(deleteUser)

module.exports = router;