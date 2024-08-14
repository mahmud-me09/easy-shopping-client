import { Outlet } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <>
    <p>This is home</p>
      <Outlet></Outlet>
    </>
  )
}

export default App