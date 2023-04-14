import { useState } from "react";
const InputForm = ({ handleSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const clearForm = () => {
    setNewName("");
    setNewPhone("");
  };

  const handleName = (e) => {
    setNewName(e.target.value);
  };
  const handlePhone = (e) => {
    setNewPhone(e.target.value);
  };
  const handler = (e) => {
    e.preventDefault();
    handleSubmit(newName, newPhone) ? clearForm() : null;
  };
  return (
    <form onSubmit={handler}>
      <div>
        name: <input value={newName} onChange={handleName} />
      </div>
      <div>
        phone: <input value={newPhone} onChange={handlePhone} />
      </div>
      <button type="submit">add</button>
    </form>
  );
};
export default InputForm;
