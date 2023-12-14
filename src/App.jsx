import { Route, Routes } from 'react-router-dom';
import Aside from './Aside'
import Create from './Create'
import Delete from './Delete'

export const App = () => {
  return (
    <>
      <Aside />
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/delete" element={<Delete />} />
      </Routes>
    </>
  )
}