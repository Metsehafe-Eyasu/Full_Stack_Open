import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter }) => {
  const filteredPersons = persons.filter((person) =>
    new RegExp(filter, "i").test(person.name)
  );

  const handleDelete = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }
  
  return (
    <div>
      {filteredPersons.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.phone} 
            <button onClick={() => handleDelete(person.id)}>Delete</button>
          </p>
        );
      })}
    </div>
  );
};
export default Persons;
