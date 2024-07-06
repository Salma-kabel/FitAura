const { Sequelize } = require('sequelize');
const Exercise = require('./models/Exercise');
const sequelize = require('./config/database');

const addSampleExercise = async () => {
  try {
    await sequelize.sync();
    const exercise = await Exercise.create({
      userId: 1,
      name: 'Push-up',
      duration: 30,
      description: 'A basic push-up exercise',
      caloriesBurned: 50,
      date: new Date(),
    });
    console.log('Exercise added:', exercise);
    process.exit(0);
  } catch (error) {
    console.error('Error adding exercise:', error);
    process.exit(1);
  }
};

addSampleExercise();
