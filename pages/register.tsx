import 'bootstrap/dist/css/bootstrap.min.css' 
import { useState } from 'react'
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {useRouter} from 'next/router'


export default function Register (){

    const router=useRouter()
    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    
    const [nombre, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setMessage] = useState('')
         




    const [submitted, setSubmitted] = useState(false)

    const [register, setRegister] = useState({
        nombre: "",
        edad:"",
        email: "",
        password: "",
        confirmPassword: "",
        telefono:"",
        foto:"",
      });


    const handleChange = (event) => {
        setRegister({ ...register, [event.target.name]: event.target.value });
      };

    
      const handleValidation = () => {
        console.log('hola');
        
        const { password, confirmPassword, nombre, email } = register;
        if (password !== confirmPassword) {
            console.log(password,confirmPassword);
            
          toast.error(
            "Password and confirm password should be same.",
            toastOptions
          );
          return false;
        } else if (nombre.length < 3) {
          toast.error(
            "Username should be greater than 3 characters.",
            toastOptions
          );
          return false;
        } else if (password.length < 8) {
          toast.error(
            "Password should be equal or greater than 8 characters.",
            toastOptions
          );
          return false;
        } else if (email === "") {
          toast.error("Email is required.", toastOptions);
          return false;
        }
    
        return true;
      };
      
    


      const handleSubmit = async (event) => {
        event.preventDefault();
        if(handleValidation()){
        console.log(register);
        
        try {
            const response =await axios.post('/api/register', register)
            router.push('/login')
            fetch('/api/contact/', {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(register)
            }).then((res) => {
                console.log('Response received')
                if (res.status === 200) {
                    console.log('Response succeeded!')
                    setSubmitted(true) 
                    setName('')
                    setEmail('')
                    setMessage('')
                }        
            })



            console.log(response);
          } catch (error) {
            console.log(error);
            toast.error("email is incorrect.", toastOptions);
          }
        }else{
        toast.error("registration error", toastOptions);
        // if (handleValidation()) {
        //   const { email, nombre, password } = register;
        //   const { data } = await axios.post(registerRoute, {
        //     nombre,
        //     email,
        //     password,
        //   });
    
        //   if (data.status === false) {
        //     toast.error(data.msg, toastOptions);
        //   }

        // }
      };






    const handleSubmit2 = (e) => {
        
        e.preventDefault()
        // validateForm()
        console.log('Sending')
        const data = {
            nombre,
            email,
            password
        }
        fetch('/api/contact/', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        }).then((res) => {
            console.log('Response received')
            if (res.status === 200) {
                console.log('Response succeeded!')
                setSubmitted(true) 
                setName('')
                setEmail('')
                setMessage('')
            }        
        })
      }
      
    } 


    return(<div>
        {/* action="/api/register" method="post" */}
    <form className="vh-100 gradient-custom"  onSubmit={handleSubmit}   >
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" >
                <div className="card-body p-5 text-center">
                    <div className="mb-md-0 mt-md-3 pb-2">

                    <h2 className="fw-bold mb-2 text-uppercase">Registrar</h2>

                    <div className="form-outline form-white mb-4">
                        <input type="text" name='nombre'  className="form-control form-control-lg" onChange={(e) => handleChange(e)} />
                        <label className="form-label">Nombre</label>
                    </div>             
                    <div className="form-outline form-white mb-4">
                        <input type="number" name='edad'  className="form-control form-control-lg" onChange={(e) => handleChange(e)}/>
                        <label className="form-label">Edad</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                        <input type="email" name='email'  className="form-control form-control-lg" onChange={(e) => handleChange(e)}/>
                        <label className="form-label">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <input type="password" name='password'  className="form-control form-control-lg"onChange={(e) => handleChange(e)} />
                        <label className="form-label" >Password</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                        <input type="password" name='confirmPassword'  className="form-control form-control-lg" onChange={handleChange}/>
                        <label className="form-label" >Confirm Password</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                        <input type="text"  name='telefono' className="form-control form-control-lg"onChange={(e) => handleChange(e)}/>
                        <label className="form-label">Telefono</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                        <input type="text"  name='foto' className="form-control form-control-lg" onChange={(e) => handleChange(e)}/>
                        <label className="form-label">Foto</label>
                    </div>
                    
                    {/* <input type='submit' value='Register'></input> */}
                    <button className="btn btn-outline-light btn-lg px-5" type="submit"  >Registrar</button>   
                    <br/>
                    <br/>
                    <p className="mb-0">Ya estas registrado <a href="/login" className="text-white-50 fw-bold">log in</a>
                    </p>
                    </div>
    
                </div>
                </div>
            </div>
            </div>
        </div>
        </form>
        <ToastContainer />
    </div>)
}