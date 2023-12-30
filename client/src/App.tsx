import { Toaster } from "react-hot-toast"
import { Provider } from "react-redux"
import { RouterProvider } from "react-router-dom"
import { router } from "routes"
import { appStore } from "./store"

function App() {

  return (
    <>
      <Toaster />
      <Provider store={appStore}>
        <RouterProvider router={router} />
      </Provider>
    </>
  )
}

export default App
