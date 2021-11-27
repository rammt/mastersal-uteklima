import "./App.css";
import Button from "@mui/material/Button";

function App() {
  const buttonClicked = async () => {
    const response = await fetch("/open_door");

    if (response.status !== 200) {
      alert("Error");
    } else {
      alert("Opening door");
    }
  };

  return (
    <div className="App">
      <div className="App-container">
        <Button variant="contained" onClick={buttonClicked}>
          Åpne døren
        </Button>
      </div>
    </div>
  );
}

export default App;
