import {
  createTask,
  deleteTask,
  getTaskByUserId,
} from "../services/baseService/taskService.js";

export const handleCreateTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, date, note, length } = req.body;

    const task = await createTask(name, userId, length, date, note);

    return res.status(201).json({
      success: true,
      data: task,
    });
  } catch (err) {
    console.error(e);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

export const handleDeleteTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const { taskId } = req.body;

    await deleteTask(userId, taskId);

    return res.json({
      success: true,
      message: "Deleted",
    });
  } catch (err) {
    console.error(e);

    if (e.message === "don not have permission") {
      return res.status(403).json({
        status: 403,
        message: "You do not have permission",
      });
    }

    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};

export const handleGetTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    const { offset } = req.params;

    const listTasks = await getTaskByUserId(userId, startDate, endDate, offset);

    return res.json({
      success: true,
      data: listTasks,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: 500,
      message: "Server error",
    });
  }
};
