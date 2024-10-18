const { EventEmitter } = require('events');
const { Message } = require('../models/Message.model');

const messageEmitter = new EventEmitter();

const create = async (author, text, roomId) => {
  const message = await Message.create({ author, text, roomId });

  messageEmitter.emit('message', message);

  return message;
};

const getByRoomId = async (id) => {
  messageEmitter.once('message', async () => {
    const roomMessages = await Message.findAll({ where: { roomId: id } });

    return roomMessages;
  });
};

module.exports = { create, getByRoomId };
