import { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';

const LoginForm = () => {
  const { setUserInfo } = useContext(UserContext);
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) {
      setUserInfo({ name });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <button type="submit">Start Chat</button>
    </form>
  );
};

export default LoginForm;
