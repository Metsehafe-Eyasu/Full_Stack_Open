import personService from "../services/persons";

const Persons = ({ persons, setPersons, filter, setNotif }) => {
  const filteredPersons = persons.filter((person) =>
    new RegExp(filter, "i").test(person.name)
  );

  const handleDelete = (id) => {
    const person = persons.find((p) => p.id === id);
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== id));
        })
        .catch((err) => {
          console.log(err.message);
          setPersons(persons.filter((p) => p.id !== id));
          setNotif({
            message: `Information of '${person.name}' has already been removed from server`,
            type: "error",
          });
          setTimeout(() => {
            setNotif({ message: null, type: null });
          }, 5000);
          // alert(`the person '${newName}' was already deleted from server`);
        });
    }
  };

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
