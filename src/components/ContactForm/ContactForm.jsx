import React, { useState } from 'react';
import { InputContact, Form, ButtonForm } from './ContactForm.styled';

const ContactForm = ({ createContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  // зчитуємо данні з input
  const handleChangeContact = ({ target: { value, name } }) => {
    if (name === 'name') {
      setName(value);
      return;
    }
    if (name === 'number') {
      setNumber(value);
      return;
    }
  };
  // при натисканні на кнопку :
  // 1)прибираємо перезавантаження браузера
  // 2)передаємо створені контакти
  // 3) записуємо до Стейт імя та номер телефону контакту

  const handleSubmitForm = e => {
    e.preventDefault();
    createContact(name, number);
    setName('');
    setNumber('');
  };

  return (
    <Form onSubmit={handleSubmitForm}>
      Name:
      <InputContact
        type="text"
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        onChange={handleChangeContact}
        required
      />
      Number:
      <InputContact
        type="tel"
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        onChange={handleChangeContact}
        required
      />
      <ButtonForm type="submit">Add contact</ButtonForm>
    </Form>
  );
};

export default ContactForm;
