// @desc Get all contacts
// @route GET api/contacts
// @access public
const getContacts = async (request, response) => {
    await response.json({ message: 'Got all contacts' });
}

// @desc get a contact
// @route GET api/contacts/id
// @access public
const getContact = async (request, response) => {
    await response.json({ message: `Got contact for id ${request.params.id}` });
}

// @desc Create a contact
// @route POST api/contacts
// @access public
const createContact = async (request, response) => {
    console.log(request.body);
    const { name, email, phone } = request.body;
    if (!name || !email || !phone) {
        await response.status(400);
        throw new Error('All fields are mandatory');
    }
    await response.json({ message: `create a new contact` });
}

// @desc Update a contact
// @route PUT api/contacts/id
// @access public
const updateContact = async (request, response) => {
    await response.json({ message: `update contact for id ${request.params.id}` });
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