import { Route, Routes } from "react-router-dom"
import AddCop from "../pages/AddCop"
import EditCop from "../pages/EditCop"
import HomePage from "../pages/Home"
import SearchCop from "../pages/SearchCop"

const Rotas = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/add" element={<AddCop />}></Route>
            <Route path="/search" element={<SearchCop />}></Route>
            <Route path="/edit" element={<EditCop />}></Route>
        </Routes>
    )
}

export { Rotas }