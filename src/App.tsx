import FMSCADataTable from "./components/FMSCADataTable";
import PageLayout from "./layout/PageLayout";

function App() {
  return (
    <PageLayout>
      <FMSCADataTable isPivot={false} />
    </PageLayout>
  );
}

export default App;
