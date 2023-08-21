import { RouterProvider } from "react-router-dom"
import router from '../src/Routes/Routes/Routes'
import { Toaster } from "react-hot-toast"

const App = () => {
  return (
    <div className="max-w-[1440px] mx-auto font-body">
      <RouterProvider router={router}></RouterProvider>
      <Toaster />
    </div>
  )
}

export default App
