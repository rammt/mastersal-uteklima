import "./App.css";
import { useState } from "react";
import { Button, Snackbar, Alert, CircularProgress, Box } from "@mui/material";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [doorCountdownValue, setDoorCountdownValue] = useState(0);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const startDoorCountdown = () => {
    const tickRate = 10;
    let value = 100;
    setDoorCountdownValue(value);

    const timer = setInterval(() => {
      value -= 100 / (6000 / tickRate); // 6 second countdown
      setDoorCountdownValue(value);
      if (value <= 0) {
        clearInterval(timer);
      }
    }, tickRate)
  }


  const buttonClicked = async () => {
    setIsLoading(true);
    await new Promise(_ => setTimeout(_, 1500));

    const response = await fetch("/open_door");
    setIsLoading(false);

    if (response.status !== 200) {
      setSnackbarOpen(true);
    } else {
      startDoorCountdown();
    }
  };

  const CircularProgressWithLabel = () => {
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress variant="determinate" value={doorCountdownValue} color="success" size={100} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h3 style={{ "textAlign": "center" }}>
            Åpent
          </h3>
        </Box>
      </Box>
    );
  }

  return (
    <div className="App">
      {doorCountdownValue > 0 ? <div className="App-container">
        <CircularProgressWithLabel />
      </div> :
        <div className="App-container">
          <Button variant="contained" onClick={buttonClicked} disabled={isLoading}>
            Åpne døren
          </Button>
          <CircularProgress style={{ "visibility": isLoading ? "visible" : "hidden" }} />
        </div>}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
      >
        <Alert severity="error">Buu! Noe gikk galt (sikkert Kruge sin feil)</Alert>
      </Snackbar>
    </div>
  );
}

export default App;
