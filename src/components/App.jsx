import React, { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import  ContactList  from './ContactList/ContactList';
import  ContactFilter  from './ContactFilter/ContactFilter'
import css from './AppStyled.module.css'

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contactsToLocalStorage = localStorage.getItem(
      'contactsToLocalStorage'
    );

    if (contactsToLocalStorage) {
      try {
        const parseContactList = JSON.parse(contactsToLocalStorage);
        this.setState({ contacts: parseContactList });
      } catch {
        this.setState({ contacts: [] });
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem(
        'contactsToLocalStorage',
        JSON.stringify(this.state.contacts)
      );
    }
  }

  onformSubmit = ({ id, name, number }) => {
    const contact = { id, name, number };
    this.setState(({ contacts }) => {
      return { contacts: [contact, ...contacts] };
    });
  };

  onFilter = e => {
    this.setState({
      filter: e.target.value,
    });
  };

  onDeleteHandler = id => {
    const filteredContacts = this.state.contacts.filter(
      contact => contact.id !== id
    );
    this.setState(prevState => {
      return { ...prevState, contacts: [...filteredContacts] };
    });
  };

  onFilterContacts = () => {
    let filterContact = [];
    if (this.state.filter) {
      filterContact = this.state.contacts.filter(
        contact =>
          contact.name.includes(this.state.filter) ||
          contact.name.toLowerCase().includes(this.state.filter)
      );
    } else {
      return this.state.contacts;
    }
    return filterContact;
  };
  render() {
    const { contacts, filter } = this.state;

    return (
      <div className={css.container}>
        <span className={css.TitlePhonebook}>Phonebook</span>
        <ContactForm onSubmit={this.onformSubmit} contacts={contacts} />
        <span className={css.ContactsTitle}>Contacts</span>
        <ContactFilter onFilter={this.onFilter} filter={filter} />
        <ContactList
          contacts={contacts}
          filter={filter}
          onDelete={this.onDeleteHandler}
          filterContacts={this.onFilterContacts}
        />
      </div>
    );
  }
}