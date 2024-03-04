const Contact = require('../models/contactModel');

// @desc Get all contacts
// @route GET api/contacts
// @access public
const getContacts = async (request, response) => {
    const contact = await Contact.find();
    await response.json(contact);
}

// @desc get a contact
// @route GET api/contacts/id
// @access public
const getContact = async (request, response) => {
    // const contact = await Contact.findById(request.params.id);
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        response.status(404);
        throw new Error('Contact not found');
    }
    await response.json(contact);
}

// @desc Create a contact
// @route POST api/contacts
// @access public
const createContact = async (request, response) => {
    const { name, email, phone } = request.body;
    if (!name || !email || !phone) {
        await response.status(400);
        throw new Error('All fields are mandatory');
    }
    const contact = Contact.create({ name, email, phone });
    await response.json(contact);
}

// @desc Update a contact
// @route PUT api/contacts/id
// @access public
const updateContact = async (request, response) => {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        response.status(404);
        throw new Error('Contact not found');
    }
    const id = request.params.id;
    const body = request.body;
    const updatedContact = Contact.findByIdAndUpdate(
        id,
        body,
        { new: true }
    );
    console.log(updatedContact._update)
    await response.json(updatedContact._update);
}

// @desc Delete a contact
// @route DELETE api/contacts/id
// @access public
const deleteContact = async (request, response) => {
    await response.json({ message: `Deleted contact for id ${request.params.id}` });
}

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}