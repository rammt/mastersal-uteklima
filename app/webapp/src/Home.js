import React from 'react';
import "./App.css";
import Button from "@mui/material/Button";

function Home() {
  const buttonClicked = async () => {
    const response = await fetch("/open_door");

    if (response.status !== 200) {
      alert("Error");
    } else {
      alert("Opening door");
    }
  };

  const handleLogin = async () => {
    const response = await fetch("/login/auth");

    let uri = await response.json();
    const redirect_url = uri.message;
    window.location.replace(uri.message)
  }
  return (
    <div className="App">
      <div className="App-container">
        <Button variant="contained" onClick={buttonClicked}>
          Åpne døren
        </Button>
        <Button variant="contained" onClick={handleLogin}>
          Logg inn
        </Button>
      </div>
    </div>
  );
}

export default Home;
