import Navbar from './components/Navbar.jsx';
import HomePage from './pages/HomePage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import SettingsPage from './pages/SettingsPage.jsx';

import {Routes, Route} from 'react-router-dom';
import { authUser } from './store/useAuthStore.js';

const App = () => {

  const {authUser} = useAuthStore()

  return (
    <div >

      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/setting" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />


      </Routes>

    </div>
  );
};

export default App;
