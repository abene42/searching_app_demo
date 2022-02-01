import logo from './logo.svg';
import './App.css';
import React from "react";
import AddCategoryPage from "./pages/add-category/add-category.page";
import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<AddCategoryPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
