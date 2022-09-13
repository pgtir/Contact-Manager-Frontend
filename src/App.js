// #25B39E #4BBFEB  #2B4255 #F8B84E #F05542 --> #FB9678 #03C9D7 #777E89 #FEC90F #949DB2 #000000DE
// -->dark- #E6E5E8 #20232D #20232A #03C9D7 #FEC90F #00C292

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignupPage from './pages/Signup'
import LoginPage from './pages/Login'
import HomePage from './pages/Home'
import ContactsPage from './pages/Contacts'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<SignupPage/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
          <Route path='/login' element={<LoginPage/>}></Route>
          <Route path='/home' element={<HomePage/>}></Route>
          <Route path='/contacts/:pageType' element={<ContactsPage/>}></Route>
          <Route path='/tags/:pageType' element={<ContactsPage/>}></Route>
          <Route path='/groups/:pageType' element={<ContactsPage/>}></Route>
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
