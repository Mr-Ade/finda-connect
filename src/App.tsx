
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { LocationProvider } from "@/contexts/LocationContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { Navbar } from "@/components/Navbar";
import { DraggableAiChat } from "@/components/DraggableAiChat";
import Routes from "./Routes";
import "@/assets/css/components/editor.css";

function App() {
  return (
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
  );
}

export default App;
