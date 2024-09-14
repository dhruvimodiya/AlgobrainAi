import { useState } from 'react'
import './App.css'
import Task1 from './pages/Task1'
import Task2NextUi from './pages/Task2NextUi'
import InputForm from './pages/InputForm'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Demo1 from './pages/Demo1'
import Task3 from './pages/Task3'
import ImagesgalaryPage from './pages/ImagesgalaryPage'
import Task4 from './pages/Task4'


function App() {

  return (
    <>
    {/* <Task1/> */}
    {/* <Task2NextUi/> */}
    {/* <InputForm/> */}
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<Demo1/>}/> */}
        {/* <Route path='/' element={<Task4/>}/> */}
        <Route path='/' element={<Task3/>}/>
        {/* <Route path='/images' element={<ImagesgalaryPage/>}/> */}
        {/* <Route path='/' element={<InputForm/>}/> */}
        {/* <Route path='/' element={<Task1/>}/> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
