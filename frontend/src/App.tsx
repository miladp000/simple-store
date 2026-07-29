import { Route, Routes } from "react-router-dom"
import Home from "@/pages/Home"
import Create from "@/pages/Create"
import Menu from "@/components/Menu"
import { ProductProvider } from "@/contexts/ProductContext"
import { Toaster } from "@/components/ui/sonner"

function App() {
  
  return (
    <>
    <Toaster/>
    <ProductProvider>
      <div className="container relative pb-30 pt-30 min-h-screen p-1 m-auto bg-white text-dark-neutral dark:text-white dark:bg-dark-neutral">
        <div className=" min-h-100">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/create" element={<Create/>} />
          </Routes>
        </div>
        <Menu/>
      </div>
    </ProductProvider>
    </>
    
  )
}

export default App
