const express = require('express');
const exerciseInput = require('../exercises/exercisesInput');
const userExercise = require('../exercises/logExercises');

const router = express.Router();

router.post('/exerciseinput', exerciseInput);
router.post('/logexercise', userExercise);

module.exports = router;