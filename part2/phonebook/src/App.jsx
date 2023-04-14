import { useState } from "react";
import FilterForm from "./components/FilterForm";
import InputForm from "./components/InputForm";
import Persons from "./components/Persons";

function App() {
  // States
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "040-123456", id: 1 },
    { name: "Ada Lovelace", phone: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", phone: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", phone: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState(persons);

  // handle form submission
  const handleSubmit = (newName, newPhone) => {
    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return false;
    }
    if (persons.find((person) => person.phone === newPhone)) {
      alert(`${newPhone} is already added to phonebook`);
      return false;
    }

    if (newPhone === "") {
      alert(`Please enter a phone number`);
      return false;
    }
    if (newName === "") {
      alert(`Please enter a name`);
      return false;
    }

    const personObject = {
      name: newName,
      phone: newPhone,
    };
    setPersons(persons.concat(personObject));
    return true;
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <FilterForm persons={persons} setFilteredPersons={setFilteredPersons} />
        <h3>Add new</h3>
        <InputForm handleSubmit={handleSubmit} />
        <h3>Numbers</h3>
        <Persons filteredPersons={filteredPersons} />
      </div>
    </div>
  );
}

export default App;
