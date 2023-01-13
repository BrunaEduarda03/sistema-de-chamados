import { addDoc, collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi"
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "../../components/Header"
import Title from "../../components/Title"
import { AuthContext } from "../../contexts/auth";
import { db } from "../../services/firebaseConnection";
import './new.css';
export default function New(){

  const {user} = useContext(AuthContext);
  const {id} =useParams();
  const navigate = useNavigate()
;  
  const [customers,setCustomers] = useState([]);
  const [loadingCustomer,setLoadingCustomer] = useState(true);

  const [customerSelected,setCustomerSelected] = useState(0);
  const [assunto,setAssunto]=useState('');
  const [complemento,setComplemento]=useState('');
  const [status,setStatus]=useState('');
  const [editId,setEditId]=useState(false);


  useEffect(()=>{
    console.log(id);
    async function loadingCustomers(){
      const listRef = collection(db,'customers');
      await getDocs(listRef)
      .then((snapshot)=>{
        let list = [];
        snapshot.forEach((doc)=>{
          list.push({
            id: doc.id,
            nomeEmpresa:doc.data().nomeEmpresa,
          })
        })
        if(snapshot.docs.size === 0){
          toast.error('Nenhuma empresa encontrada');
          setLoadingCustomer(false);
          setCustomers({id:1,nomeEmpresa:'error'})
        }
        setCustomers(list);
        setLoadingCustomer(false);

        if(id) {
          loadId(list);
        }
      })
      .catch(()=>{
        toast.error('erro ao buscar cliente')
        setLoadingCustomer(false);
        setCustomers({id:1,nomeEmpresa:'error'})
      })
      
    }
    loadingCustomers();
  },[id])

  const loadId = async(list) =>{
    const docRef = doc(db,'chamados',id);
    await getDoc(docRef)
    .then((snapshot)=>{
      setAssunto(snapshot.data().assunto);
      setComplemento(snapshot.data().complemento);
      setStatus(snapshot.data().status);
      console.log(snapshot.data());

      let clienteIndex = list.findIndex(item => item.id === snapshot.data().clienteId);
      setCustomerSelected(clienteIndex);
      setEditId(true)
      
    })
    .catch((error)=>{
      console.log(error);
      toast.error('usuário não encontrado');
      setEditId(false)
    })
  }

  const handleOption = (e) =>{
    setStatus(e.target.value);
    console.log(e.target.value);
  }

  const handleTextArea = (e) =>{
    setComplemento(e.target.value);
    console.log(e.target.value);
  }

  const handleChangeSelect = (e) =>{
    setAssunto(e.target.value);
    console.log(e.target.value);
  }

  const handleCustomerSelected = (e) =>{
    setCustomerSelected(e.target.value);
    console.log(e.target.value);
  }

  const handleRegister = async (e) =>{
    e.preventDefault();

    if(editId){
      const docRef = doc(db,'chamados',id);
      await updateDoc(docRef,{
        cliente:customers[customerSelected].nomeEmpresa,
        clienteId:customers[customerSelected].id,
        assunto:assunto,
        status:status,
        complemento:complemento,
        userId:user.uid,
      })
      .then(() =>{
        toast.info('Chamado atualizado com sucesso!');
        setComplemento('');
        setCustomerSelected(0);
        navigate('/dashboard')

      })
      .catch((error)=>{
        console.log(error);
        toast.error('Ops,Erro ao atualizar esse chamado')
      })
      return;
    }
    
    await addDoc(collection(db,'chamados'),{
      created:new Date(),
      cliente:customers[customerSelected].nomeEmpresa,
      clienteId:customers[customerSelected].id,
      assunto:assunto,
      status:status,
      complemento:complemento,
      userId:user.uid,
    })
    .then(()=>{
      toast.success('chamado registrado');
      setCustomerSelected(0);
      setComplemento('');
    })
    .catch((error)=>{
      toast.error('Ops,erro ao registrar.Tente Novamente.');
      console.log(error);
    })
  }

  return (
    <div>
      <Header />
      <div className="content">

          <Title name={ id ? 'Editando Chamado':'Novo Chamado'}>
            <FiPlusCircle size={25} />
          </Title>
       
        
      

      <div className="container"  >

        <form className="form-profile" onSubmit={handleRegister}>

          <label>Cliente:</label>
          { loadingCustomer ? 
            (
              <input type='text' disabled={true} value='Carregando' 
              />
            )
            :
            (
              <select value={customerSelected} onChange={handleCustomerSelected}>
                {customers.map((item,index)=>{
                  return(
                  <option key={index} value={index}>
                    {item.nomeEmpresa}
                  </option>
                  )
                })
                }
              </select>
            )
        }

          <label>Assunto:</label>
          <select 
            onChange={handleChangeSelect}
            value={assunto}
            >
          <option value='suporte'>Suporte</option>
          <option value='visita tecnica'>Visita Técnica</option>
          <option value='financeiro'>Financeiro</option>
          </select>

          <label>Status</label>

          <div className="status">
          <input 
            type='radio' 
            name='status' 
            value='Em aberto'
            checked={status === 'Em aberto'}
            onChange={handleOption} 
          />
          <span>Em Aberto</span>

          <input 
            type='radio' 
            name='status' 
            value='atendido' 
            checked={status === 'atendido'}
            onChange={handleOption} 
          />
          <span>Atendido</span>

          <input 
            type='radio' 
            name='status' 
            value='Em progresso' 
            checked={status ==='Em progresso'}
            onChange={handleOption} 
          />
          <span>Em progresso</span>
          </div>

          <label>Complemento</label>
          <textarea 
          typeof="text" 
          placeholder="Descreva seu problema"
          onChange={handleTextArea}
          value={complemento}
          >
          
          </textarea>
          <button type="submit">Registrar</button>
        </form>
      </div>
      </div>
    </div>
  )
}