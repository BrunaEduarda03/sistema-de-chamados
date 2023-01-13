import SignIn from "../pages/SignIn";
import {Route, Routes} from 'react-router-dom';
import SignUp from "../pages/SignUp";
import Dashboard from "../pages/Dashboard";
import Private from "./private";
import Profile from "../pages/Profile";
import Customers from "../pages/Customers";
import New from "../pages/New";

function RoutesApp(){
  return (
    <Routes >
      <Route path='/' element ={<SignIn />}/>
      <Route path='/register' element ={<SignUp />}/>
      <Route path='/dashboard' element ={<Private> <Dashboard /> </Private>  }/>
      <Route path='/customers' element ={<Private> <Customers/> </Private>  }/>
      <Route path='/profile' element ={<Private> <Profile /> </Private>  }/>
      <Route path='/new' element ={<Private> <New /> </Private>  }/>
      <Route path='/new/:id' element ={<Private> <New /> </Private>  }/>
    </Routes>
  )
}

export default RoutesApp;