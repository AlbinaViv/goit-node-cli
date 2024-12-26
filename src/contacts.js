const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "contacts", "contacts.json");

export async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error("Error", error);
  }
}

export async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.find((contact) => contact.id === contactId);
    if (contact) {
      console.log(contact);
    } else {
      throw new Error("Contact ID doesn't exist.");
    }
  } catch (error) {
    console.error("Error", error);
  }
}

export async function removeContact(contactId) {
  try {
    const contact = await listContacts();
    const updatedContacts = contact.filter(
      (contact) => contact.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    console.log("Contact removed!");
  } catch (error) {
    console.error("Error", error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    console.log("Contact added!");
  } catch (error) {
    console.error("Error adding contact:", error);
  }
}
