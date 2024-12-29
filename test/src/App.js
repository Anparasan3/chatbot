import React from "react";
import Chatbot from "./Chatbot.js";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
      <Chatbot serverSocketUrl={`ws://localhost:8080`}/>
    </div>
  );
}

export default App;
