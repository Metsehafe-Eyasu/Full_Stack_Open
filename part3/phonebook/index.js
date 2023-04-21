const express = require("express");
const morgan = require("morgan")
const app = express();
const debug = morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      JSON.stringify(req.body)
    ].join(' ')
  })

app.use(express.json())
app.use(debug)

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/info", (req, res) => {
  const date = new Date();
  res.send(`
        <p>Phonebook has info of ${persons.length}</p>
        <p> ${date}</p>
    `);
});

app.get("/api/persons/:id", (req, res) => {
    const id = +req.params.id;
    const person = persons.find((person) => person.id === id);
    person ? res.json(person) : res.status(404).end();
})

app.delete("/api/persons/:id", (req, res) => {
    const id = +req.params.id;
    persons = persons.filter((person) => person.id != id);
    res.status(204).end();
})

const generateId = () => {
    const id = Math.floor(Math.random()*1000000 + 1)
    return id;
}

app.post("/api/persons", (req, res) => {
    const body = req.body
    if(!body.name || !body.number) {
        return res.status(400).json({
            error: "content missing"
        })
    }
    if(persons.find((person) => person.name === body.name)) {
        return res.status(400).json({
            error: "name must be unique"
        })
    }
    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    res.json(person)
})

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
