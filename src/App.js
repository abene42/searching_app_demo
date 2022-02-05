import './App.css';
import React from "react";
import AddCategoryPage from "./pages/add-category/add-category.page";
import {Route, Routes} from "react-router-dom";
import AddItemPage from "./pages/add-item/add-item.page";
import Header from "./components/header/header.component";
import HomePage from "./pages/home/home.page";


function App() {
    const homeStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '80px',
        color: '#3E4E5E',
    }
    return (

        <div>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/category" element={<AddCategoryPage/>}/>
                <Route path="/item" element={<AddItemPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
