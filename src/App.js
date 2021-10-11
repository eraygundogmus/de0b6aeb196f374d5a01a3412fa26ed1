import Header from "./components/layout/Header";
import Body from "./components/layout/Body";
import Stepper from "./components/stepper";
import "./styles/styles.scss";

function App() {
  return (
    <div className="App">
      <Header />
      <Body>
        <Stepper />
      </Body>
    </div>
  );
}

export default App;
