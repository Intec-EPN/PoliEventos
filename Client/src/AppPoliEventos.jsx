import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes/routes";
import { Provider } from "react-redux";
import { persistor, store } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter(routes);

export const AppPoliEventos = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null}  persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
};
