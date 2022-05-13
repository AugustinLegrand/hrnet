import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import ListEmployees from "../pages/ListEmployees";

export function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<HomePage />} />
                <Route exact path='/employee-list' element={<ListEmployees />} />
            </Routes>
        </BrowserRouter>
    )

}