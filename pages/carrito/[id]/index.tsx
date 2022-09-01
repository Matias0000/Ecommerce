import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Confirm, Button, Loader, Grid } from "semantic-ui-react";
import Error from "next/error";

const Products = ({ carrito1, error }) => {
  
  const { query, push } = useRouter();


  const router = useRouter()

  const {slug} = query
  
  
  const [newProduct, setNewProduct] = useState({
    title: "",
    price:"",
    thumbnail: "",
  });

  const [newCarrito,setCarrito]= useState([])

  
  const createCarrito = async () => {
    try {
      await fetch("http://localhost:3000/api/carrito", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
    } catch (error) {
      console.error(error);
    }
  };

  const agregarAlCarrito = async () => {
    await createCarrito();
    push("/");

  };

  if (error && error.statusCode)
    return <Error statusCode={error.statusCode} title={error.statusText} />;

  return (
    <Grid
      centered
      verticalAlign="middle"
      columns="1"
      style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <h1>{carrito1.title}</h1>
          <h2>Precio${carrito1.price}</h2>
          <img src={carrito1.thumbnail}></img>
          <div>
          <Button color="green" onClick={agregarAlCarrito} >
              Agregar al carrito
            </Button>

            {/* <Button color="red" onClick={open} loading={isDeleting}>
              Delete
            </Button> */}
          </div>
        </Grid.Column>
      </Grid.Row>

      {/* Confirm modal */}
      {/* <Confirm
        content={`Are you sure to delete the Product ${carrito1._id}`}
        header="Please confirm"
        open={confirm}
        onConfirm={agregarAlCarrito}
        onCancel={close}
      /> */}
    </Grid>
  );
};

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/carrito/${id}`);

  if (res.status === 200) {
    const carrito1 = await res.json();

    return {
      props: {
        carrito1,
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