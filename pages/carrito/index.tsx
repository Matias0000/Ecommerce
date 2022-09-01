// import { Button, Card, Grid } from "semantic-ui-react";
import { useRouter } from "next/router";
import TaskCard from "../../components/TaskCard";
// import { Container } from "../api/component//ui/Container";
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import {Button,Card,Container,Grid} from 'semantic-ui-react'
import { Layout } from "../../components/Layout";
import { Navbar2 } from "../../components/NavBar2";


export default function Index({ carrito = [] }) {
  const router = useRouter();

  // Render a not task view
  if (carrito.length === 0)
    return (
      <Grid
        centered
        verticalAlign="middle"
        columns="1"
        style={{ height: "80vh" }}
      >
        <Grid.Row>
          <Grid.Column textAlign="center">
            <h1>There are no Products yet Cart.</h1>
            <img src="https://img.freepik.com/vector-gratis/ningun-concepto-ilustracion-datos_108061-573.jpg?size=338&ext=jpg" />
            <div>
              <Button primary onClick={() => router.push("/")}>
                Add Productss
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
    //     {carrito.map((products) => (
    //       <Card.Header products={products} key={products._id} />
    //     ))}
    //   </div>
    // </Container>
    <>
    <Navbar2/>
    {/* <Container style={{padding:"10px"}}> */}
    {/* <Layout/> */}
      <div>
        <Card.Group itemsPerRow={4} style={{padding:"10px"}}>
          {
              carrito.map((products) =>(
                <Card key={products._id}>
                  <Card.Content>
                    <Card.Header>{products.title}</Card.Header>
                    <p>Precio ${products.price}</p>
                    <img src={products.thumbnail} style={{width:'150px',margin:'auto'}}></img>
                  </Card.Content>
                  <Card.Content extra>
                    <Button className="positive ui button" style={{padding:'10px'}} onClick={() => router.push(`/carrito/${products._id}`)}>
                      Comprar</Button>
                  </Card.Content>
                </Card>
              ))
          }
          </Card.Group>
          </div>
          <div >
        </div>
      {/* </Container>  */}
      </>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/carrito");
  const carrito = await res.json();

  return {
    props: {
        carrito,
    },
  };
}