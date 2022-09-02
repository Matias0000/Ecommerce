import 'bootstrap/dist/css/bootstrap.min.css' 
import { useState } from 'react'




export default function Register (){

    const [nombre, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log('Sending')
    
        let data = {
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


    return(<div>
        
    <form className="vh-100 gradient-custom" action="/api/register" method="post"  >
        <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div className="card bg-dark text-white" >
                <div className="card-body p-5 text-center">
                    <div className="mb-md-0 mt-md-3 pb-2">

                    <h2 className="fw-bold mb-2 text-uppercase">Registrar</h2>

                    <div className="form-outline form-white mb-4">
                        <input type="text" name='nombre'  className="form-control form-control-lg" onChange={(e)=>{setName(e.target.value)}} />
                        <label className="form-label">Nombre</label>
                    </div>             
                    <div className="form-outline form-white mb-4">
                        <input type="number" name='edad'  className="form-control form-control-lg" onChange={(e)=>{setName(e.target.value)}}/>
                        <label className="form-label">Edad</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                        <input type="email" name='email'  className="form-control form-control-lg" onChange={(e)=>{setName(e.target.value)}}/>
                        <label className="form-label">Email</label>
                    </div>

                    <div className="form-outline form-white mb-4">
                        <input type="password" name='password'  className="form-control form-control-lg" />
                        <label className="form-label" >Password</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                        <input type="text"  name='telefono' className="form-control form-control-lg" />
                        <label className="form-label">Telefono</label>
                    </div>
                    <div className="form-outline form-white mb-4">
                        <input type="text"  name='foto' className="form-control form-control-lg" />
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
    </div>)
}