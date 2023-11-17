import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../scss/Home.scss'


function Nav() {

  const [userLogado] = useState(JSON.parse(sessionStorage.getItem("usuarioLogado")))


  const handleLogout = () => {
    sessionStorage.removeItem("usuarioLogado")
    window.location.reload();
  }


  return (
    <>
      <nav style={userLogado == null ? { display: "none" } : { display: "flex" }}>
        <p>{userLogado != null ? `Usuario logado:${userLogado.nome}` : ""}</p>
        <p>{userLogado != null ? `Email:${userLogado.email}` : ""}</p>
        <button onClick={handleLogout}>Logout</button>
      </nav>
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
    </>
  )
}

export default Nav
