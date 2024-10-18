const { ApiError } = require('../exceptions/api.error');
const { Room } = require('../models/Room.model');

const create = async (name) => {
  const newRoom = await Room.create({ name });

  return newRoom;
};

const remove = async (id) => {
  await Room.destroy({ where: { id } });
};

const rename = async (id, newName) => {
  if (!newName) {
    throw ApiError.badRequest('new name required');
  }

  const renamedRoom = await Room.findOne({ where: { id } });

  renamedRoom.name = newName;
  renamedRoom.save();

  return renamedRoom;
};

module.exports = {
  create,
  remove,
  rename,
};
