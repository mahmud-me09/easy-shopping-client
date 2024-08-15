import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className='max-w-6xl mx-auto'>
    <p className='text-center w-full bg-amber-500 p-5'>This is Navbar</p>
      <Outlet></Outlet>
    </div>
  )
}

export default App