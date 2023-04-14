import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import FilterForm from "./components/FilterForm";
import InputForm from "./components/InputForm";
import Persons from "./components/Persons";

function App() {
  // States
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState(persons);

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
      setFilteredPersons(response.data);
    });
  }, [])

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
