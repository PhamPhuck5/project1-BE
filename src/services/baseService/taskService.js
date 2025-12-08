import db from "../../models/index.js";
import { checkTaskOwner } from "./roleService.js";

const Task = db.Task;
const UserCategory = db.UserCategory;

async function getUsersFollowing(categoryId) {
  return await UserCategory.findAll({
    where: { categoryId },
  });
}
function getWeekFromEpochLocal(epochMs) {
  const epochSecLocal = Math.floor(epochMs / 1000);

  const week = Math.floor(epochSecLocal / 604800);
  return week;
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

  const week = getWeekFromEpochLocal(date);

  const tasks = listFollowing.map((u) => ({
    name,
    userId: u.userId,
    date,
    week,
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

  const week = getWeekFromEpochLocal(date);

  const task = await db.Task.create({
    name,
    userId,
    date,
    length,
    note: note ?? null,
    week,
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
