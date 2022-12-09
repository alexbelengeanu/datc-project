import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserListing from './UserListing'
import UserDetail from './UserDetail'
import UserCreate from './UserCreate'
import UserEdit from './UserEdit'
import AlertsListing from './AlertsListing'
import AlertsDetail from './AlertsDetail'
import AlertsCreate from './AlertsCreate'
import AlertsEdit from './AlertsEdit'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<UserListing />}></Route>
          <Route path='/alert/edit/:id' element={<AlertsEdit />}></Route>
          <Route path='/alert/create' element={<AlertsCreate />}></Route>
          <Route path='/alert/detail/:id' element={<AlertsDetail />}></Route>
          
          
              
      
         <Route path='/user/detail/:Userid' element={<UserDetail />}></Route>
              <Route path='/user/edit/:Userid' element={<UserEdit />}></Route>
              <Route path='/user/create' element={<UserCreate />}></Route>
          
          <Route path='/alert/listing' element={<AlertsListing />}></Route>
         
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
