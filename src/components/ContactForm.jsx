import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ContactForm({onSubmit}) {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const resetForm = () => {
    setNumber('');
    setName('');
  };

  const onFormSubmit = e => {
    e.preventDefault();

    onSubmit(name, number);
    resetForm();
  };

  return (
    <>
      <form
        onSubmit={event => {
          onFormSubmit(event);
        }}
      >
        <label>
          Enter name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            value={name}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Enter number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            value={number}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Add to contact</button>
      </form>
    </>
  );
}

export default ContactForm;


ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}