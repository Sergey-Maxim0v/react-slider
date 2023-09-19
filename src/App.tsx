import Slider from "./components/Slider";

function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "90%",
          height: "500px",
        }}
      >
        <Slider />
      </div>
    </div>
  );
}

export default App;
