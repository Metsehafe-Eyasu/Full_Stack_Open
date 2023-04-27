import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

import FilterForm from "./components/FilterForm";
import InputForm from "./components/InputForm";
import Persons from "./components/Persons";

import personService from "./services/persons";
import Notification from "./components/Notification";

function App() {
  // States
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [notif, setNotif] = useState({ message: null, type: null });

  useEffect(() => {
    personService.getAll().then((returnedData) => {
      setPersons(returnedData);
    });
  }, []);

  // handle form submission
  const handleSubmit = (newName, newPhone) => {
    // Check input fields are empty
    if (newPhone === "") {
      alert(`Please enter a phone number`);
      return false;
    } else if (newName === "") {
      alert(`Please enter a name`);
      return false;
    }

    const prevPerson = persons.find((person) => person.name === newName);
    const personObject = {
      name: newName,
      phone: newPhone
    };
    // Check if person already exists
    if (prevPerson) {
      if (
        confirm(
          `${newName} is already added to phonebook. Replace the old number?`
        )
      ) {
        personService.update(prevPerson.id, personObject).then((returnedPerson) => {

        })
        updatePerson(prevPerson.id, personObject);
      }
      return true;
    }

    // Add new person
    personService.create(personObject).then((personData) => {
      setPersons(persons.concat(personData));
      setFilter("");

      setNotif({
        message: `Added '${newName}'`,
        type: "success",
      });
      setTimeout(() => {
          setNotif({ message: null, type: null });
      }, 5000);
    });
    return true;
  };

  const updatePerson = (id, personObject) => {
    personService
      .update(id, personObject)
      .then((returnedPerson) => {
        setPersons(persons.map((p) => (p.id !== id ? p : returnedPerson)));
      })
      .catch((err) => {
        console.log(err.message);
        setPersons(persons.filter((p) => p.id !== id));
        setNotif({
          message: `the person '${newName}' was already deleted from server`,
          type: "error",
        });
        setTimeout(() => {
            setNotif({ message: null, type: null });
        }, 5000);
        // alert(`the person '${newName}' was already deleted from server`);
      });
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
        <Notification message={notif.message} type={notif.type} />
        <FilterForm filter={filter} setFilter={setFilter} />
        <h3>Add new</h3>
        <InputForm handleSubmit={handleSubmit} />
        <h3>Numbers</h3>
        <Persons persons={persons} setPersons={setPersons} filter={filter} setNotif={setNotif}/>

        <br />
      </div>
    </div>
  );
}

export default App;
