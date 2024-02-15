import { Route, Routes } from 'react-router-dom';
import Aside from './Aside'
import Create from './Create'
import Delete from './Delete'
import Update from './Update';
import LoginAdmin from './LoginAdmin';
import { useEffect, useState } from 'react';

export const App = () => {

  const [token, setToken] = useState('')

  useEffect(() => {
    const storageToken = localStorage.getItem('token')
    if (storageToken) {
      setToken(storageToken)
    } else {
      localStorage.removeItem('token')
    }
  }, [token])

  if (token) {
    return (
      <>
        <Aside />
        <Routes>
          <Route path="/" element={<Create token={token} />} />
          <Route path="/delete" element={<Delete token={token} />} />
          <Route path="/update/:id" element={<Update token={token} />} />
        </Routes>
      </>
    )
  } else {
    return (
      <LoginAdmin setToken={setToken} />
    )
  }
}