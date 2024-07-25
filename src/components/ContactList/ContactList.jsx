import { nanoid } from 'nanoid';
import { PhoneList, PhoneItem, DeleteButton } from './ContactList.styled';

const ContactList = ({ contacts, handleDeleteBtn }) => {
  return (
    <PhoneList>
      {contacts.map(contact => (
        <PhoneItem key={nanoid()}>
          <p>{contact.name}</p>
          <p>{contact.number}</p>
          <DeleteButton
            type="button"
            onClick={() => handleDeleteBtn(contact.id)}
          >
            Delete
          </DeleteButton>
        </PhoneItem>
      ))}
    </PhoneList>
  );
};
export default ContactList;
