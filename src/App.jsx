import Card from "./components/Card"
import Counter from "./components/Counter"
import "./App.css";
import Passwordgenrator from "./components/Passwordgenrator/PasswordCard";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-000 to-gray-800 flex items-center rounded-2xl justify-center ">
      {/* <Counter /> */}
      {/* <div className="flex flex-wrap gap-4 justify-center">
        <Card userName="Rahul" btnText="click me" />
        <Card userName="Rohit" btnText="visit me" />
        <Card userName="Raghav" btnText="view more" />
      </div> */}
      <div className="flex justify-center items-center min-h-[90vh]">
        <Passwordgenrator />
      </div>
    </div>
  );
}


export default App
