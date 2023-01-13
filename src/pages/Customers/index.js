import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { FiUser } from "react-icons/fi";
import { toast } from "react-toastify";
import Header from "../../components/Header";
import Title from "../../components/Title";
import { db } from "../../services/firebaseConnection";

export default function Customers (){
  const [nome,setNome] = useState('');
  const [cnpj,setCnpj] = useState('');
  const [endereco,setEndereco] = useState('');

  const handleRegister = async (e)=>{
    e.preventDefault();

    if(nome !== '' && cnpj !== '' && endereco !== ''){
      await addDoc(collection(db,'customers'),{
        nomeEmpresa:nome,
        cnpj:cnpj,
        endereço:endereco,
      })
      .then(()=>{
        setNome('');
        setCnpj('');
        setEndereco('');
        toast.success('Cliente Cadastrado com sucesso');
      })
      .catch((error)=>{
        console.log(error);
        toast.error('Error ao cadastrar');
      })
    }else{
      toast.info('complete todos os campos!')
    }
    
  }

  return (
    <div>
      <Header />
    
    <div className="content">
      <Title name='Clientes'>
        <FiUser size={25} />
      </Title>
    

    <div className="container" >
      <form className="form-profile" onSubmit={handleRegister}>
      
        <label>Nome do Cliente</label>
        <input 
        type='text'
        placeholder="Nome da Empresa" 
        value={nome}
        onChange={(e)=>setNome(e.target.value)}
        />
        <label>CNPJ</label>
        <input 
        type='text' 
        placeholder="Digite o CNPJ"
        value={cnpj}
        onChange={(e)=>setCnpj(e.target.value)}
        />
        <label>Endereço</label>
        <input 
        type='text' 
        placeholder="Endereço da Empresa"
        value={endereco}
        onChange={(e)=>setEndereco(e.target.value)}
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
    </div>
    </div>
    
  )
}