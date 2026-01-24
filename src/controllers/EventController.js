import {
  createEvent,
  deleteEvent,
} from "../services/baseService/eventService.js";

export const handleCreateEvent = async (req, res) => {
  try {
    console.log("AAAAAAAAAAAAAAAA");
    const userId = req.user.id;
    const { groupId, name, categoryId, date, length } = req.body;

    const event = await createEvent(
      groupId,
      userId,
      name,
      categoryId,
      date,
      length
    );

    return res.status(201).json({
      success: true,
      data: event,
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
export const handleDeleteEvent = async (req, res) => {
  try {
    const userId = req.user.id;
    const { eventId, groupId } = req.body;

    const ok = await deleteEvent(userId, groupId, eventId);

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
