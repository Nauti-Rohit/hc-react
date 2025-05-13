import Card from "./components/Card"
import Counter from "./components/Counter"
import "./App.css";
function App() {

  return (
    <>
      {/* <Counter /> */}
      <Card userName="Rahul" btnText="click me" />
      <Card userName="Rohit" btnText="visit me" />
      <Card userName="Raghav" btnText="view more" />
    </>
  )
}

export default App
