import React from 'react'
import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import ProductPage from '../pages/ProductPage'
import AboutPage from '../pages/About'
import ContactPage from '../pages/Contact'
import ServicePage from '../pages/Services'
import Students from '../pages/Students' 

const CustomRouter = () => {
  return (
    <Routes>
        <Route
         path='/'
         element={<Home/>}
        />
        <Route
         path='/about'
         element={<AboutPage/>}
        />
        <Route
         path='/product'
         element={<ProductPage/>}
        />
        <Route
         path='/contact'
         element={<ContactPage/>}
        />
        <Route
         path='/services'
         element={<ServicePage/>}
        />
        <Route
         path='/students'
         element={<Students/>}
        />
    </Routes>
  )
}

export default CustomRouter