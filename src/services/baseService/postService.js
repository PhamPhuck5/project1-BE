import db from "../../models/index.js";
import { Op } from "sequelize";

const { Post } = db;
const PAGE_SIZE = 10;

export async function findByEventId(eventId, lastId = null, limit = PAGE_SIZE) {
  const where = { eventId };

  if (lastId) {
    where.id = {
      [Op.lt]: lastId,
    };
  }

  return Post.findAll({
    where,
    order: [["id", "DESC"]],
    limit,
  });
}

export async function findPostById(postId) {
  return await Post.findByPk(postId);
}

export async function create(senderId, eventId, date, key) {
  const post = await Post.create({
    senderId,
    eventId,
    date,
    key,
  });

  return post;
}

export async function deleteById(postId) {
  const deletedCount = await Post.destroy({
    where: { id: postId },
  });
  return deletedCount > 0;
}
