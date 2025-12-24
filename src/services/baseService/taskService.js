import db from "../../models/index.js";
import { Op } from "sequelize";
import { checkTaskOwner } from "./roleService.js";
import { CONFIG_VALUE } from "../../config.js";
const Task = db.Task;
const UserCategory = db.UserCategory;

async function getUsersFollowing(categoryId) {
  return await UserCategory.findAll({
    where: { categoryId },
  });
}

export const onCreateEvent = async (
  name,
  categoryId,
  length,
  date,
  eventId,
  transaction
) => {
  const listFollowing = await getUsersFollowing(categoryId);

  const tasks = listFollowing.map((u) => ({
    name,
    userId: u.userId,
    date,
    length,
    connect: eventId,
  }));

  await Task.bulkCreate(tasks, {
    transaction,
    validate: true,
  });
};

export const createTask = async (name, userId, length, date, note) => {
  if (!name || !date) {
    throw new Error("Missing required fields");
  }

  const task = await Task.create({
    name,
    userId,
    date,
    length,
    note: note ?? null,
    connect: null,
  });

  return task;
};

export const deleteTask = async (userId, taskId) => {
  if (!(await checkTaskOwner(userId, taskId))) {
    throw new Error("don not have permission");
  }
  const deleted = await db.Task.destroy({
    where: { id: taskId },
  });

  return true;
};
export const getTaskByUserId = async (
  userId,
  startDate,
  endDate,
  offset = 0
) => {
  offset = Number(offset);
  if (Number.isNaN(offset)) {
    throw new Error("offset must be a number");
  }
  const shiftDays = offset * 7;

  const maxDate = new Date(endDate);

  const minDate = new Date(startDate);

  minDate.setDate(minDate.getDate() + shiftDays);
  maxDate.setDate(maxDate.getDate() + shiftDays);

  minDate.setMinutes(
    minDate.getMinutes() - CONFIG_VALUE.MAX_TASK_LENGTH_MINUTES
  );

  return await Task.findAll({
    where: {
      userId,
      date: {
        [Op.gte]: minDate,
        [Op.lte]: maxDate,
      },
    },
  });
};
