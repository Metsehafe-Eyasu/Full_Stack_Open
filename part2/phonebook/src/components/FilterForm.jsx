const FilterForm = ({ filter, setFilter }) => {
  const handleFilter = (e) => {
    console.log(e.target.value);
    setFilter(e.target.value);
  };
  return (
    <form>
      filter shown with:
      <input value={filter} onChange={handleFilter} />
    </form>
  );
};
export default FilterForm;
