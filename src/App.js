import { Route, Routes } from "react-router-dom";
import HotelsPage from "./pages/HotelsPage";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/hotels/:user" element={<HotelsPage />}></Route>
                <Route path="/admin" element={<AdminPage />}></Route>
            </Routes>


        </div>
    );
}

export default App;
