import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react'
import {Button,Card,Container,Grid} from 'semantic-ui-react'
import { Navbar2 } from '../../components/NavBar2'

export default function Index() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Sending')

    let data = {
        name,
        email,
        message
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

  return (
    <>
    <Navbar2/>
    <Container className='ui container' >
      
      < form  className="ui form">
        < div className="field">
          < label htmlFor='name'>Name</label>
          < input type='text' onChange={(e)=>{setName(e.target.value)}} name='name'  />
        </div>

        < div className="field">
          < label htmlFor='email'>Email</label>
          < input type='email' onChange={(e)=>{setEmail(e.target.value)}} name='email' />
        </div>

        < div className="field">
          < label htmlFor='message'>Message</label>
          < input type='text' onChange={(e)=>{setMessage(e.target.value)}} name='message'  />
        </div>

        <Button className='ui primary button' type='submit' onClick={(e)=>{handleSubmit(e)}}>
        Save
        </Button>
      </form >
    </Container>
    </>
  )
}