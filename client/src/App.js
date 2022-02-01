import Axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState(null);

  const [name, setName] = useState("No Name");
  const [age, setAge] = useState(0);
  const [username, setUsername] = useState("");

  const [addedUsers, setAddedUsers] = useState(0);

  useEffect(() => {
    Axios.get("http://localhost:3001/getUsers").then((res) => {
      setUsers(res.data);
      console.log(res.data);
    });
  }, [addedUsers]);

  const createUser = () => {
    Axios.post("http://localhost:3001/addUser", {
      name: name,
      age: age,
      username: username,
    }).then((res) => {
      console.log("created User");
      setAddedUsers(addedUsers + 1);
    });
  };

  return (
    <div className="App">
      <div className="form">
        <input
          placeholder="name"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          placeholder="age"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <input
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="username"
        />
        <h1>Users list</h1>
        <button onClick={createUser}>Create User</button>
      </div>
      {users &&
        users.map((user) => {
          return (
            <div className="user">
              <h2>Name: {user.name}</h2>
              <h3>Age: {user.age}</h3>
              <p>Username: {user.username}</p>
            </div>
          );
        })}
    </div>
  );
}

export default App;
