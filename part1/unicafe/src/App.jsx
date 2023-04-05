import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const Statistics = ({ good, neutral, bad, total }) => {
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="Good" value={good} />
        <StatisticLine text="Neutral" value={neutral} />
        <StatisticLine text="Bad" value={bad} />
        <StatisticLine text="All" value={total} />
        <StatisticLine
          text="Average"
          value={((good - bad) / total).toFixed(1)}
        />
        <StatisticLine
          text="Positive"
          value={((good / total) * 100).toFixed(1) + "%"}
        />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const handleGoodClick = () => {
    setTotal(total + 1);
    setGood(good + 1);
  };

  const handleBadClick = () => {
    setTotal(total + 1);
    setBad(bad + 1);
  };

  const handleNeutralClick = () => {
    setTotal(total + 1);
    setNeutral(neutral + 1);
  };

  return (
    <div className="App">
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  );
};

export default App;
