import './signin.css'
import logo from '../../assets/logo.png';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';

function SignIn() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {signIn,loadingAuth} = useContext(AuthContext);

  const handleSignIn = async(e) => {
    e.preventDefault();
    if(email !== '' && password !=='') {
     await signIn(email,password);
    }
    
  }

  return (
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt='logo signIn' />
        </div>
        

      <form className='form' onSubmit={handleSignIn}> 
      <h1>Entrar</h1>
        <input 
        type="text" 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)} 
        placeholder='E-mail'
        />

        <input 
        type="password" 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)} 
        placeholder='Senha' 
        />

        <button type='submit'>
          {loadingAuth ? 'Carregando...' : 'Acessar'}
          </button>
      </form>
      <Link to='/register'>Criar uma conta</Link>
      </div>

      
    </div>
  );
}

export default SignIn;
