import { Route, Routes } from 'react-router-dom';
import Aside from './Aside'
import Create from './Create'
import Delete from './Delete'
import Update from './Update';

export const App = () => {
  return (
    <>
      <Aside />
      <Routes>
        <Route path="/" element={<Create />} />
        <Route path="/delete" element={<Delete />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </>
  )
}