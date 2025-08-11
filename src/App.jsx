import './App.css';
import LoginForm from './components/Login';
import Chatbot from './components/Chatbot';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import UserProvider from './context/UserContext';

function App() {
  const Main = () => {
    const { userInfo } = useContext(UserContext);
    return userInfo ? <Chatbot /> : <LoginForm />;
  };

  return (
    <UserProvider>
      <Main />
    </UserProvider>
  );
}

export default App;

