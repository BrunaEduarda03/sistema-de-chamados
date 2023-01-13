import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { AuthContext } from '../../contexts/auth';

function SignUp() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [name,setName] = useState('');

  const {signUp,loadingAuth} = useContext(AuthContext);
  
   function handleSignUp(e) {
  e.preventDefault();
  if(name !== '' && email !== '' && password !== ''){
     signUp(name,email,password);
  }
}

return (
    <div className="container-center">
      <div className="login">
      <div className="login-area">
        <img src={logo} alt='logo signUp'/>
      </div>



      <form className='form' onSubmit={handleSignUp}>
      <h1>Nova Conta</h1>
        <input 
        type="text" 
        value={name} 
        onChange={(e)=>setName(e.target.value)} 
        placeholder='Nome' 
        />
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
          {loadingAuth ? 'Carregando...' : 'Cadastrar'}
          </button>
      </form>
      <Link to='/'>Já possuo conta!</Link>
    </div>
    </div>
  );
}

export default SignUp;
