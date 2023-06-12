import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import Filter from './Filter';
import Contacts from './Contacts';

const useLocalStorage = (key, defValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(localStorage.getItem(key)) ?? defValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, setState];
};

function App() {
  const CONTACT_KEY = 'contacts';

  const [contacts, setContacts] = useLocalStorage(CONTACT_KEY, []);
  const [filter, setFilter] = useState('');

  const handleFilter = event => {
    setFilter(event.target.value);
  };

  const formSubmitHandler = (name, number) => {
    const isDuplicate = contacts.some(
      contact => contact.name === name && contact.number === number
    );

    if (isDuplicate) {
      alert('This contact is already in contacts');
    } else {
      setContacts([...contacts, { name: name, number: number, id: nanoid() }]);
    }
  };

  const handleDelete = (e, id) => {
    e.preventDefault();

    const newArray = contacts.filter(contact => contact.id !== id);
    setContacts(newArray);
  };

  const makeFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  

  return (
    <>
      <h1>Phonebook</h1>
      {contacts !== 0 && <ContactForm onSubmit={formSubmitHandler} />}

      <h2>Contacts</h2>
      <Filter filter={filter} handleFilterChange={handleFilter} />

      {contacts.length !== 0 && filter === '' ? (
        <Contacts contacts={contacts} onClick={handleDelete} />
      ) : (
        <Contacts contacts={makeFilteredContacts()} />
      )}
    </>
  );
}
export default App;
