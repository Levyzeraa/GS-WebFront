import { useState } from 'react'


function Login() {

    const [usuario, setUsuario] = useState({
        usuario: "",
        senha: "",
    })

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setUsuario({ ...usuario, [name]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let user;

        try {
            const response = await fetch("http://localhost:5000/usuarios");
            if (response.ok) {
                const users = await response.json();

                for (let i = 0; i < users.length; i++) {
                    const use = users[i];

                    if (use.nome === usuario.usuario && use.senha === usuario.senha) {
                        user = use;
                        break;
                    }
                }
            }

            if (user) {
                sessionStorage.setItem('usuarioLogado', JSON.stringify(user));

                setTimeout(() => {
                    window.location = '/';
                }, 1000);
            } else {
                alert("Usuário/senha inválidos");
                setUsuario({
                    usuario: "",
                    senha: "",
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (

        <div className='login'>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Usuario:</label>
                <input
                    type="text"
                    name="usuario"
                    value={usuario.usuario}
                    onChange={handleChange}
                    placeholder='Digite seu usuário' />
            </div>

            <div>
                <label>Senha:</label>
                <input
                    type="password"
                    name="senha"
                    value={usuario.senha}
                    onChange={handleChange}
                    placeholder='Digite sua senha' />
            </div>

            <button type="submit">Entrar</button>
        </form>
        </div>

    )
}

export default Login
