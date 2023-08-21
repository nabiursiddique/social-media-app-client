import { RouterProvider } from "react-router-dom"
import router from "./Routes/Routes"

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto font-body">
      <RouterProvider router={router}></RouterProvider>
    </div>
  )
}

export default App
