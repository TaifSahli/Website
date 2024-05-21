const Contact = require('../models/ContactModel');
const createContact = async (req, res) => {
    console.log('Any Thing');
    try {
        if (!req.session.userId) {
            req.flash('error', 'User not authenticated');
            if (req.xhr || req.headers.accept.indexOf('json') > -1) {
                return res.status(401).json({ error: 'User not authenticated' });
            } else {
                return res.redirect('/contact');
            }
        }

        const contactData = {
            name: req.body.name,
            email: req.body.email,
            subject: req.body.subject,
            message: req.body.message,
            userId: req.session.userId
        };

        await Contact.create(contactData);
        req.flash('message', 'Contact saved successfully');
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(201).json({ message: 'Contact saved successfully' });
        } else {
            return res.redirect('/contact');
        }
    } catch (error) {
        req.flash('error', 'Error saving contact. Please try again.');
        if (req.xhr || req.headers.accept.indexOf('json') > -1) {
            return res.status(500).json({ error: 'Error saving contact. Please try again.' });
        } else {
            return res.redirect('/contact');
        }
    }
};





const updateContact = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getContact = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        if (!contact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json(contact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteContact = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedContact = await Contact.findByIdAndDelete(id);
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { createContact, deleteContact, getContact, updateContact };
