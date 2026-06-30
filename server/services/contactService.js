const Contact = require('../models/Contact');

const createContactMessage = async (data) => {
  const contact = await Contact.create(data);
  return contact;
};

module.exports = {
  createContactMessage,
};
