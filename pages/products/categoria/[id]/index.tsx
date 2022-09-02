import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { Confirm, Button,Card, Loader, Grid } from "semantic-ui-react";

import Error from "next/error";

const Products = ({ product, error }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { query, push } = useRouter();

  const deleteProduct = async () => {
    const { id } = query;
    try {
      await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteProduct();
    push("/");
    close();
  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <div>
        <Card.Group  itemsPerRow={4} style={{padding:"10px"}}>
          {
              product.map((products) =>(
                <Card key={products._id}>
                  <Card.Content>
                    <Card.Header>{products.title}</Card.Header>
                    <p>Precio ${products.price}</p>
                    <p>Codigo:{products.code}</p>
                    <p>Stock:{products.stock}</p>

                    <img src={products.thumbnail} style={{width:'150px',margin:'auto'}}></img>
                    <p>Description{products.description}</p>
                  </Card.Content>
                  <Card.Content extra>
                    <Button className="positive ui button" style={{padding:'10px'}} onClick={() => router.push(`/carrito/`)} >Comprar</Button>
                    <Button primary onClick={() => router.push(`/products/${products._id}`)}>View</Button>
                    <Button secondary onClick={() => router.push(`/products/${products._id}/edit`)}> Editar</Button>
                  </Card.Content>
                </Card>
              ))
          }
          </Card.Group>
          </div>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/categoria/${id}`);

  if (res.status === 200) {
    const product = await res.json();

    return {
      props: {
        product,
      },
    };
  }

  return {
    props: {
      error: {
        statusCode: res.status,
        statusText: "Invalid Id",
      },
    },
  };
}

export default Products;