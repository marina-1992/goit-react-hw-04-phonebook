import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import Notification from './Notification/Notification';
import { nanoid } from 'nanoid';
import { ContactContainer, Title } from './App.styled';

const initialContatcs = [
  { id: '1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: '2', name: 'Hermione Kline', number: '443-89-12' },
  { id: '3', name: 'Eden Clements', number: '645-17-79' },
  { id: '4', name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || [...initialContatcs]
  );

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContact = (nameForm, numberForm) => {
    const isAlreadyInContact = contacts.find(el => el.name === nameForm);
    if (isAlreadyInContact) {
      return alert(`${nameForm} is already in contacts.`);
    }
    const newContact = {
      id: nanoid(),
      name: nameForm,
      number: numberForm,
    };
    setContacts(prev => [newContact, ...prev]);
  };

  const handleFilteredInput = () => {
    const normalizedFilter = filter.toLowerCase();

    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );

    return filteredContacts;
  };

  const contactsFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const deleteBtn = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <ContactContainer>
      <Title>Phonebook</Title>
      <ContactForm createContact={createContact} />
      <Title>Contacts</Title>
      {contacts.length > 0 ? (
        <Filter filterContact={contactsFilter} />
      ) : (
        <Notification text={'Your phonebook is empty. Add first contact!'} />
      )}

      <ContactList
        contacts={handleFilteredInput()}
        handleDeleteBtn={deleteBtn}
      />
    </ContactContainer>
  );
};
