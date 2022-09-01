
import {Button,Card,Container,Grid} from 'semantic-ui-react';

export default function Prueba({product})  {
  // console.log(product);
  
  return (
      <Container >
        <Card.Group itemsPerRow={4}>
          {
              product.map((products) =>(
                <Card key={products._id}>
                  <Card.Content>
                    <Card.Header>{products.title}</Card.Header>
                    <p>{products.price}</p>
                  </Card.Content>
                </Card>
              ))
          }
          </Card.Group>
      </Container> 
  )
}

export const getServerSideProps = async(ctx)=>{
  
  console.log('backend');
  const res = await fetch('http://localhost:3000/api/products')
  const product = await res.json();
  
  return{
    props:{
      product,
    }
  }
}