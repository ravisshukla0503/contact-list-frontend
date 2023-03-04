import './App.css';
import { Routes, Route } from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import ContactList from './components/ContactList';
import AddContactList from './components/AddContactList';
import Navbar from './components/Navbar';
import UpdateContact from './components/UpdateContact';
import PrivateComponent from './components/PrivateComponent';

function App() {
  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path='/' element={<ContactList />} />
          <Route path='/addContact' element={<AddContactList />} />
          <Route path='/updateContact/:id' element={<UpdateContact />} />
          <Route path='/logout' element={<h1>logout</h1>} />
        </Route>

        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
