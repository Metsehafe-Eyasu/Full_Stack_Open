import { useState } from "react";
const FilterForm = ({ persons, setFilteredPersons }) => {
  const [filter, setFilter] = useState("");
  const handleFilter = (e) => {
    setFilter(e.target.value);
    setFilteredPersons(
      persons.filter((person) => new RegExp(filter, "i").test(person.name))
    );
  };
  return (
    <form>
      filter shown with:
      <input value={filter} onChange={handleFilter} />
    </form>
  );
};
export default FilterForm;
