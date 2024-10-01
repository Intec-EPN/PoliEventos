import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { routes } from "./routes/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";

const router = createBrowserRouter(routes);


export const AppPoliEventos = () => {
  return (
    <Provider store={store}>
      <RouterProvider router = {router} />
    </Provider>
  )
}
