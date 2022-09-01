import { Menu, Container, Button } from "semantic-ui-react";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from 'axios'


export const Navbar2 = () => {
  const router = useRouter();

  const logout = async()=>{
    try {
     const response = await axios.post('/api/auth/logout')
     router.push("/login")   
    } catch (error) {
     console.log(error)
    }
          
 }

  return (
    <Menu
      inverted
      borderless
      attached
    >
      <Container>
        <Menu.Item name="home">
          <Link href="/">
            <img src="/favicon.ico" />
          </Link>
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            {/* <Button
              size="mini"
              primary
              onClick={() => router.push("/products/new")}
              style={{margin:'5px'}}>
              New Products
            </Button> */}
            {/* <Button href="/login" primary style={{margin:'5px'}}>login</Button> */}
            {/* <Button href="/register" primary style={{margin:'5px'}}>Register</Button> */}
            <Button  className="ui green button" onClick={()=>router.push("/carrito/")} style={{margin:'5px'}}>Carrito</Button>
            <Button  className="ui blue button" onClick={()=>router.push("/chat/")} style={{margin:'5px'}}>Chat</Button>
            <Button  className="ui green button" onClick={()=>router.push("/nodemailer/")}>Envio Mail</Button>
            <Button  className="ui red button" onClick={()=>{logout()}} style={{margin:'5px'}}>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
        {/* <div>
          <Button href="/login">login</Button>
          <Button href="/register">Register</Button>
        </div> */}
      </Container>
    </Menu>
  );
};