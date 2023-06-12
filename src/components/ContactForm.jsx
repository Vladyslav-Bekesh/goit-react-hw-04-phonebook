import React, { Component, useState } from 'react';

class ContactFormOLD extends Component {
  state = {
    name: '',
    number: '',
  };

  onInputChange = ({ target }) => {
    this.setState({ [target.name]: target.value });
  };

  onFormSubmit = e => {
    e.preventDefault();

    const { name, number } = this.state;
    this.props.onSubmit(name, number);
    this.resetForm();
  };

  resetForm = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form
          onSubmit={event => {
            this.onFormSubmit(event);
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
              onChange={this.onInputChange}
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
              onChange={this.onInputChange}
              required
            />
          </label>
          <br />

          <button type="submit">Add to contact</button>
        </form>
      </>
    );
  }
}

function ContactForm() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');

  const handleChange = ({ target: { name: name, value: value } }) => {
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(number);
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

    this.props.onSubmit(name, number);
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
