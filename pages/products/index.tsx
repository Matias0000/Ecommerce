// import { Button, Card, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import TaskCard from "../../component/TaskCard";
// import { Container } from "../api/component//ui/Container";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {Button,Card,Container,Grid} from 'semantic-ui-react'
import { Layout } from "../../component/Layout";


export default function Index({ product = [] }) {
  const router = useRouter();

  // Render a not task view
  if (product.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no Products yet HOme.</h1>
            <img src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=jpg" />
            <div>
              <Button primary onClick={() => router.push("/products/new")}>
                Create Product
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );

  // Render a list of products
  return (
    // <Container>
    //     hola
    //   <div className="grid grid-cols-4 gap-4">
    //     {product.map((products) => (
    //       <Card.Header products={products} key={products._id} />
    //     ))}
    //   </div>
    // </Container>
    <>
    {/* <Container style={{padding:"10px"}}> */}
    {/* <Layout/> */}
      <div>
        <Card.Group itemsPerRow={4} style={{padding:"10px"}}>
          {
              product.map((products) =>(
                <Card key={products._id}>
                  <Card.Content>
                    <Card.Header>{products.title}</Card.Header>
                    <p>Precio ${products.price}</p>
                    <img src={products.thumbnail} style={{width:'150px',margin:'auto'}}></img>
                  </Card.Content>
                  <Card.Content extra>
                    <Button className="positive ui button" style={{padding:'10px'}} onClick={() => router.push(`/carrito/${products._id}`)} >Comprar</Button>
                    <Button primary onClick={() => router.push(`/products/${products._id}`)}>View</Button>
                    <Button secondary onClick={() => router.push(`/products/${products._id}/edit`)}> Editar</Button>
                  </Card.Content>
                </Card>
              ))
          }
          </Card.Group>
          </div>
          <div >
          <Button className="fluid ui button"
              primary
              onClick={() => router.push("/products/new")}
               >
              New Products
            </Button>
            </div>
      {/* </Container>  */}
      </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const product = await res.json();

  return {
    props: {
        product,
    },
  };
}