import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { NavigationBar } from "./components/NavigationBar";
import { TaskForm } from "./components/TaskForm";
import { TasksList } from "./components/TasksList";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavigationBar></NavigationBar>
        <Routes>
          <Route path="/" element={<Dashboard/>}></Route>
          <Route path="/create-task" element={<TaskForm/>}></Route>
          <Route path='/tasks' element={<TasksList/>}></Route>
        </Routes>
      </BrowserRouter>
    </>    
  );
}

export default App;
