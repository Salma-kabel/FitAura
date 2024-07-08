const Goal = require('../models/Goal');

exports.setGoal = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const { name, currentValue, goalValue } = req.body;

  try {
    const goal = await Goal.create({ name, currentValue, goalValue });

    await user.addGoal(goal);

    res.status(201).json({
      ...goal.toJSON(),
      userId: user.id,
    });
  } catch (error) {
    console.error('Error Creating user Goal', error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateGoal = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const attributes = ['name', 'currentValue', 'goalValue'];
  const goalId = req.params.id;

  try {
    const goal = await Goal.findOne({ where: { id: goalId, userId } });
    if (!goal) {
      return res.status(404).json({ error: "You can't access this Goal" });
    }
    attributes.forEach((attribute) => {
      if (req.body[attribute] !== undefined) {
        goal[attribute] = req.body[attribute];
      }
    });

    await goal.save();
    res.status(200).json(goal);
  } catch (error) {
    console.error('Error Updating user Goal information', error);
    res.status(500).json({ error: error.message });
  }
};

exports.deleteGoal = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const goalId = req.params.id;

  try {
    const goal = await Goal.findOne({ where: { id: goalId, userId } });
    if (!goal) {
      return res.status(404).json({ error: "You can't access this Goal" });
    }
    await Goal.destroy({ where: { id: goalId } });
    res.status(200).json({ Success: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal information', error);
    res.status(500).json({ error: error.message });
  }
};

exports.viewProgress = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const goalId = req.params.id;

  try {
    const goal = await Goal.findOne({ where: { id: goalId, userId } });
    if (!goal) {
      return res.status(404).json({ error: "You can't access this Goal" });
    }
    const progress = {
      Progress: user.goalWeight
        ? (((user.weight - user.goalWeight) / user.goalWeight) * 100).toFixed(2)
        : null,
    };

    res.status(200).json(progress);
  } catch (error) {
    console.error('Error getting goal progress', error);
    res.status(500).json({ error: error.message });
  }
};

exports.viewGoals = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  try {
    const goals = await Goal.findAll({ where: { userId } });
    if (!goals) {
      return res.status(404).json({ error: "Goals not found" });
    }
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error retrieving goals", error);
    res.status(500).json({ error: error.message });
  }
};

exports.viewGoal = async (req, res) => {
  const user = req.user;
  const userId = user.id;
  const goalId = req.params.id;
  try {
    const goal = await Goal.findOne({ where: { id: goalId, userId } });
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }
    res.status(200).json(goal);
  } catch (error) {
    console.error("Error retrieving goal", error);
    res.status(500).json({ error: error.message });
  }
};
