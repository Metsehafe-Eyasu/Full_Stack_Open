const Header = ({ course }) => {
  return <h1>{course}</h1>;
};

const Content = ({ contents }) => {
  return (
    <div>
        {contents.map((content) => {
            return <Part key={content.exercises} part={content.part} exercises={content.exercises}/>
        })}
    </div>
  );
};

const Part = ({ part, exercises }) => {
  return (
    <p> {part} {exercises} </p>
  );
};

const Total = ({ count }) => {
  return <p>Number of exercises {count}</p>;
};

const App = () => {
  const course = "Half Stack application development";

  const contents = [
    { part: "Fundamentals of React", exercises: 10 },
    { part: "Using props to pass data", exercises: 7 },
    { part: "State of a component", exercises: 14 },
  ];

  const total = contents.reduce((acc, obj) => {return acc + obj.exercises}, 0);
  
  return (
    <div>
      <Header course={course} />
      <Content contents={contents} />
      <Total count={total} />
    </div>
  );
};

export default App;
