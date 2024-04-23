import {
  BrowserRouter,
  Link,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";


function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:image" element={<Search />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
