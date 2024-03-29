const Contact = require('../models/contactModel');

// @desc Get all contacts
// @route GET api/contacts
// @access private
const getContacts = async (request, response) => {
    const contact = await Contact.find();
    await response.json(contact);
}

// @desc get a contact
// @route GET api/contacts/id
// @access private
const getContact = async (request, response) => {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        response.status(404);
        throw new Error('Contact not found');
    }
    await response.json(contact);
}

// @desc Create a contact
// @route POST api/contacts
// @access private
const createContact = async (request, response) => {
    const { name, email, phone } = request.body;
    if (!name || !email || !phone) {
        await response.status(400);
        throw new Error('All fields are mandatory');
    }
    const contact = Contact.create({ name, email, phone, user_id: request.user.id });
    await response.json(contact);
}

// @desc Update a contact
// @route PUT api/contacts/id
// @access private
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
    response.status(200).json(updatedContact._update);
}

// @desc Delete a contact
// @route DELETE api/contacts/id
// @access private
const deleteContact = async (request, response) => {
    const contact = await Contact.findById(request.params.id);
    if (!contact) {
        response.status(404);
        throw new Error('Contact not found');
    }
    await Contact.deleteOne({ _id: request.params.id });
    await response.json(contact);
}

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}