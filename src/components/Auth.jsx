import { useState } from 'react';
import axios from 'axios';

const Auth = ({ setToken }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/auth/login' : '/auth/signup';
    
    try {
      const res = await axios.post(`http://localhost:5000${endpoint}`, formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Authentication failed');
    }
  };

 return (
  <div className="auth-container">
    <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
    {error && <div className="error-banner">{error}</div>}
    
    <form className="auth-form" onSubmit={handleSubmit}>
      {!isLogin && (
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      )}
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">{isLogin ? 'Login' : 'Sign Up'}</button>
    </form>

    <p onClick={() => setIsLogin(!isLogin)} className="toggle-auth">
      {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
    </p>
  </div>
); 
}
export default Auth;