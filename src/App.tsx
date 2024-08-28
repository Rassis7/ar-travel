import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Calculator } from "./Calculator";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Calculator />
    </QueryClientProvider>
  );
}

export default App;
