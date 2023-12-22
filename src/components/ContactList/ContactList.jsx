import propTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import css from './ContactList.module.css'

export default function ContactList ({ filterContacts, onDelete })  {
  return (
    <ul className={css.list}>
      {filterContacts().map(({ name, number, id }) => (
        <ContactItem
          key={id}
          name={name}
          id={id}
          number={number}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  filterContacts: propTypes.func.isRequired,
  onDelete: propTypes.func.isRequired,
};