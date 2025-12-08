import { createTask, deleteTask } from "../services/baseService/taskService.js";

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
