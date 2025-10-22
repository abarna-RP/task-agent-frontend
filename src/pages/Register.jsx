import React, { useState } from 'react';
import API, { setAuth } from '../api/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/signup', { email, password, name });
      
      // ✅ Save token and user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setAuth(res.data.token);

      nav('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Register failed');
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4 font-semibold">Register</h2>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="w-full p-2 border mb-2 rounded"
        required
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="w-full p-2 border mb-2 rounded"
        required
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="w-full p-2 border mb-2 rounded"
        required
      />
      <button
        type="submit"
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Register
      </button>
    </form>
  );
}