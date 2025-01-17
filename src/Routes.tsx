import { Route, Routes as RouterRoutes } from "react-router-dom";
import { adminRoutes } from "./routes/adminRoutes";
import { authRoutes } from "./routes/authRoutes";
import { dashboardRoutes } from "./routes/dashboardRoutes";
import { mainRoutes } from "./routes/mainRoutes";

export function Routes() {
  const allRoutes = [...mainRoutes, ...authRoutes, ...dashboardRoutes, ...adminRoutes];
  
  return (
    <RouterRoutes>
      {allRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
    </RouterRoutes>
  );
}