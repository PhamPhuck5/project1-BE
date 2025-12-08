import db from "../../models/index.js";
import { checkAdminByCategory } from "./roleService.js";
import { onCreateEvent } from "./taskService.js";
const Event = db.Event;

export const createEvent = async (
  groupId,
  userId,
  name,
  categoryId,
  date,
  length
) => {
  return db.sequelize.transaction(async (t) => {
    if (!(await checkAdminByCategory(userId, categoryId))) {
      throw new Error("don not have permission");
    }
    if (!name || !categoryId || !date) {
      throw new Error("Missing required info");
    }

    const event = await db.Event.create(
      {
        name,
        categoryId,
        creatorId: userId,
        date,
        length,
      },
      { transaction: t }
    );
    await onCreateEvent(name, categoryId, length, date, event.id, t);
    return event;
  });
};
export const deleteEvent = async (userId, groupId, eventId) => {
  if (!(await checkAdminByCategory(userId, categoryId))) {
    throw new Error("don not have permission");
  }
  const event = await db.Event.findByPk(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.creatorId !== userId) {
    throw new Error("Permission denied");
  }

  await event.destroy();
  return true;
};
