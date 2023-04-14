const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => {
        return (
          <p key={person.name}>
            {person.name} {person.phone}
          </p>
        );
      })}
    </div>
  );
};
export default Persons;
