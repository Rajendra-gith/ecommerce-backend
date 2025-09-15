const express = require('express');
const { addUser, getUsers, loginUser  } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/add', addUser);
router.get('/', authMiddleware, getUsers);
router.post('/login', loginUser);

module.exports = router;
