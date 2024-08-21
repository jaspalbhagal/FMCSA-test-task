import FMSCADataTable from "./components/FMSCADataTable";
import { TabProvider } from "./context/TabContext";
import PageLayout from "./layout/PageLayout";
import Tables from "./pages/Tables";

function App() {
  return (
    <TabProvider>
      <PageLayout>
        <Tables />
      </PageLayout>
    </TabProvider>
  );
}

export default App;
