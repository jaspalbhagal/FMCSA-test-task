import "./App.css";
import { getTableData } from "./data-service/csv-data";

function App() {
  const { isLoading } = getTableData();

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      {isLoading ? "...Loading" : "done"}
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
