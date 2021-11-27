import "./App.css";
import Button from "@mui/material/Button";

function App() {
  const buttonClicked = async () => {
    const response = await fetch("/express_backend");

    if (response.status !== 200) {
      throw Error(response.message);
    }

    return response;
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
