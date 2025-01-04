import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocationProvider } from "@/contexts/location";
import Routes from "@/Routes";
import { Toaster } from "@/components/ui/toaster";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <BrowserRouter>
          <main className="min-h-screen">
            <Routes />
          </main>
          <Toaster />
        </BrowserRouter>
      </LocationProvider>
    </QueryClientProvider>
  );
}

export default App;