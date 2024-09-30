import { Provider } from "react-redux"
import { AdminPage } from "./pages/AdminPage"
import { AdministracionTema } from "./theme/AdministracionTema"
import { storeAdministracion } from "./store/storeAdministracion"

export const AdministracionMain = () => {
  return (
    <AdministracionTema>
      <Provider store={storeAdministracion}>
        <AdminPage />
      </Provider>
    </AdministracionTema>
  )
}
