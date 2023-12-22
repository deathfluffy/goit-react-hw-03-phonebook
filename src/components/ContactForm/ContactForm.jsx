import { nanoid } from 'nanoid';
import propTypes from 'prop-types';
import css from './ContactForm.module.css';
import { Component } from 'react';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, number } = this.state;
    const nameInContacts = this.props.contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (nameInContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    const contact = { id: nanoid(), name, number };
    this.props.onSubmit(contact);

    
    this.setState({ name: '', number: '' });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className={css.formContainer}>
        <form className={css.MainForm} autoComplete="off" onSubmit={this.handleSubmit}>
          <div>
            <span className={css.FormLabel} htmlFor="name">
              Name
            </span>
            <div>
              <input
                className={css.InputField}
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                pattern="^[a-zA-Zа-яА-Я]+([' -][a-zA-Zа-яА-Я ]?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
              />
            </div>
          </div>
          <div>
            <span className={css.FormLabel} htmlFor="number">
              Number
            </span>
            <div>
              <input
                className={css.InputField}
                type="tel"
                name="number"
                value={this.state.number}
                onChange={this.handleChange}
                pattern="\+?\d{1,4}[-.\s]?\(?\d{1,3}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
              />
            </div>
          </div>
          <button className={css.addButton} type="submit">
            Add contact
          </button>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  contacts: propTypes.arrayOf(propTypes.object).isRequired,
};
