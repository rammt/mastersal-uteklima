import "./App.css";
import { useState } from "react";
import { Button, Snackbar, Alert, CircularProgress, Box } from "@mui/material";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState("");
  const [doorCountdownValue, setDoorCountdownValue] = useState(0);

  const handleSnackbarClose = () => {
    setSnackbarContent("");
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
    const response = await fetch("/open_door");

    if (response.status === 200) {
      startDoorCountdown();
    } else {
      // Check whether the Raspberry Pi is offline or if it is another error
      const raspPiResponse = await fetch("/raspberry_pi_health_check");
      setSnackbarContent(raspPiResponse.status !== 200 ? "Raspberry Pien er offline" : "Buu! Noe gikk galt");
    }
    setIsLoading(false);
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
        open={snackbarContent.length}
        onClose={handleSnackbarClose}
        autoHideDuration={6000}
      >
        <Alert severity="error">{snackbarContent}</Alert>
      </Snackbar>
    </div>
  );
}

export default App;
