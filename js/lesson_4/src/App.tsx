// import React from "react";
import { personNames } from "./task";
import "./App.css";
// import { arraySum, arrayFilter, getUserNames } from "./utils";

function App() {
  const showPersonNames = () => {
    return (
      <ul>
        {personNames.map((person, index) => (
          <li key={index}>{person}</li>
        ))}
      </ul>
    );
  };
  //   const array = [1, 2, 3, 4, 5];
  //   const usersArray = [
  //     {
  //       name: "Peter",
  //       surname: "Jackson",
  //       age: 20,
  //     },
  //     {
  //       name: "Mary",
  //       age: "30",
  //     },
  //   ];
  //   const sum = arraySum(array);
  //   const filter = arrayFilter(array, (item) => item % 2 === 0);
  //   const userNamesArray = getUserNames(usersArray);

  return (
    <div className="App">
      <div className="wrapper">
        {showPersonNames()}
        {/* <p>{sum}</p>
        <p>{filter.toString()}</p>
        <p>{userNamesArray.toString()}</p> */}
      </div>
    </div>
  );
}

export default App;
