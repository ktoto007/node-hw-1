const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactList = await listContacts();
  const contact = contactList.find((el) => el.id === contactId);
  return contact ? contact : null;
};

const removeContact = async (contactId) => {
  const contactList = await listContacts();
  let contact = null;
  let index = null;
  contactList.find((el, ind) => {
    if (el.id === contactId) {
      contact = el;
      index = ind;
    }
  });

  if (contact) {
    contactList.splice(index, 1);
    fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
    return contact;
  } else {
    return contact;
  }
};

const addContact = async (name, email, phone) => {
  const contactList = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contactList.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2));
  return newContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
