import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "./routes/routes";

const router = createBrowserRouter(routes);


export const AppPoliEventos = () => {
  return (
    <RouterProvider router = {router} />
  )
}
