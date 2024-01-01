import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { router } from "routes"
import { appStore } from "./store"
import { MyContextProvider } from "context"

function App() {

  return (
    <>
      <Toaster />
      <Provider store={appStore}>
        <MyContextProvider>
          <RouterProvider router={router} />
        </MyContextProvider>
      </Provider>
    </>
  )
}

export default App
