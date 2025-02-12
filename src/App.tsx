
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { LocationProvider } from "@/contexts/LocationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { DraggableAiChat } from "@/components/DraggableAiChat";
import Routes from "./Routes";
import "@/assets/css/components/editor.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <BrowserRouter>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              <main className="flex-grow pt-16">
                <Routes />
              </main>
              <DraggableAiChat />
            </div>
            <Toaster />
          </AuthProvider>
        </BrowserRouter>
      </LocationProvider>
    </QueryClientProvider>
  );
}

export default App;
