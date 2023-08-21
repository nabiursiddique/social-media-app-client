import { RouterProvider } from "react-router-dom"
import router from "./Routes/Routes"

const App = () => {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
