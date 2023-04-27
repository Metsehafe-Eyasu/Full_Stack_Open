const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}
const password = process.argv[2];

const url = `mongodb+srv://fullstack-test:${password}@cluster0.atlt3hj.mongodb.net/phonebook?retryWrites=true&w=majority`;
mongoose.set("strictQuery", false);
mongoose.connect(url);

console.log(process.argv);

const personSchema = new mongoose.Schema({
    name: String,
    phone: String,
})
const Person = mongoose.model("Person", personSchema);


if (!process.argv[3]) {
  Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person.name, person.phone);
    })
    mongoose.connection.close();
  })
} else if (!process.argv[4]) {
  console.log("give name and number as arguments");
} else {
    const person = new Person({
        name: process.argv[3],
        phone: process.argv[4],
    });
    person.save().then((result) => {
        console.log('phonebook:');
        console.log(`added ${person.name} number ${person.phone} to phonebook`);
        mongoose.connection.close();
    });
}
