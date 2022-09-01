import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css' 
import e from 'express';
import { useState } from 'react';
// import User from '../models/Users'
// import {connectDb} from '../config/db'
// import {userServiceFactory} from '../service/service'
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
// const userService = userServiceFactory();
import {useRouter} from 'next/router'

export default function Login (){

 const router=useRouter()

const [login, setLogin] = useState({
  email:'',
  password:''
});


const handleChange =  (e) => {
  setLogin({
    ...login,
    [e.target.name]:e.target.value
  })
console.log(e.target.value,e.target.name);
}

// const passwordHandler =  (e) => {
//     setPassword(e.target.value );
// }
     
const handleSubmit= async(e) =>{
  e.preventDefault();
  console.log(login);
  try {
    const response =await axios.post('/api/auth/login', login)
  router.push('/')
  console.log(response);
  } catch (error) {
    console.log(error);
    
  }
  

}   

  return(<div className="vh-100 gradient-custom">
        {/* action="/api/login" method="post" */}
    <form className="vh-100 gradient-custom"  onSubmit={handleSubmit}>
    <div className="container py-5 h-100">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
          <div className="card bg-dark text-white" >
            <div className="card-body p-5 text-center">

              <div className="mb-md-5 mt-md-4 pb-5">

                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                <div className="form-outline form-white mb-4">
                  <input type="email" id="email" name="email" className="form-control form-control-lg" onChange={handleChange}/>
                  <label className="form-label" htmlFor="email">Email</label>
                </div>

                <div className="form-outline form-white mb-4">
                  <input type="password" id="password" name="password" className="form-control form-control-lg" onChange={handleChange}/>
                  <label className="form-label" htmlFor="password">Password</label>
                </div>

                <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                {/* <button className="btn btn-outline-light btn-lg px-5" type="submit" onClick="{autenticarUsuario}" >Prueba</button> */}
                <button className="btn btn-outline-light btn-lg px-5" type="submit" >Login</button>
                
                {/* <input type='submit' value='Login'></input> */}

                <a href='/register' className="btn btn-outline-light btn-lg px-5" type="submit" >Register</a>

                <div className="d-flex justify-content-center text-center mt-4 pt-1">
                  {/* <a href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
        rel="stylesheet" className="text-white"><i className="fab fa-facebook-f fa-lg">google</i></a>
                   */}
                  {/* <a href="#" className="btn btn-google btn-block"><i className="fab fa-google fa-fw"></i>
                                        google</a>
                  <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2">google</i></a>
                  <a href="#!" className="text-white"><i className="fab fa-google fa-lg">google</i></a> */}
                  
                </div>

              </div>

              <div>
                <p className="mb-0">No tiene cuenta ? <a href="/register" className="text-white-50 fw-bold">Sign Up</a>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
        

    </div>)
}