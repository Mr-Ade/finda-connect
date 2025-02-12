
import { Route, Routes as RouterRoutes } from "react-router-dom";
import { adminRoutes } from "./routes/adminRoutes";
import { authRoutes } from "./routes/authRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";
import { mainRoutes } from "./routes/mainRoutes";
import { businessOwnerRoutes } from "./routes/businessOwnerRoutes";

export default function Routes() {
  const allRoutes = [
    ...mainRoutes, 
    ...authRoutes, 
    ...dashboardRoutes, 
    ...adminRoutes,
    ...businessOwnerRoutes
  ];
  
  return (
    <RouterRoutes>
      {allRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </RouterRoutes>
  );
}
