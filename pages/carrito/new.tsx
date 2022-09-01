import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";

import { useRouter } from "next/router";
import { Navbar2 } from "../../component/NavBar2";

const NewProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title: "",
    price:"",
    thumbnail: "",
  });
  const { query, push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getProduct = async () => {
    const res = await fetch("http://localhost:3000/api/carrito/" + query.id);
    const data = await res.json();
    setNewProduct({ title: data.title, price: data.price, thumbnail: data.thumbnail });
  };

  useEffect(() => {
    if (query.id) getProduct();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errs = validate();

    if (Object.keys(errs).length) return setErrors(errs);

    setIsSubmitting(true);

    if (query.id) {
      await updateTask();
    } else {
      await createTask();
    }

    await push("/");
  };

  const handleChange = (e) =>
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value    });

  const validate = () => {
    let errors = {};

    if (!newProduct.title) {
      errors.title = "Title is required";
    }
    if (!newProduct.price) {
        errors.price = "price is required";
      }
    if (!newProduct.thumbnail) {
      errors.thumbnail = "thumbnail is required";
    }

    return errors;
  };

  const createTask = async () => {
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

  const updateTask = async () => {
    try {
      await fetch("http://localhost:3000/api/carrito/" + query.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Navbar2/>
    <Grid
    centered
    verticalAlign="middle"
    columns="3"
    style={{ height: "80vh" }}
    >
      <Grid.Row>
        <Grid.Column textAlign="center">
          <div className="form-container">
            <h1>{!query.id ? "Create Product" : "Update Product"}</h1>
            <div>
              {isSubmitting ? (
                <Loader active inline="centered" />
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Input
                    error={
                      errors.title
                        ? { content: "Please enter a title", pointing: "below" }
                        : null
                    }
                    label="title"
                    placeholder="title"
                    name="title"
                    onChange={handleChange}
                    value={newProduct.title}
                    autoFocus
                  />
                  <Form.Input
                    error={
                      errors.price
                        ? { content: "Please enter a price", pointing: "below" }
                        : null
                    }
                    label="Price"
                    placeholder="price"
                    name="price"
                    onChange={handleChange}
                    value={newProduct.price}
                    autoFocus
                  />
                  <Form.Input
                    error={
                      errors.thumbnail
                        ? {
                            content: "Please enter a thumbnail",
                            pointing: "below",
                          }
                        : null
                    }
                    label="thumbnail"
                    placeholder="thumbnail"
                    name="thumbnail"
                    onChange={handleChange}
                    value={newProduct.thumbnail}
                  />
                  <Button type="submit" primary>
                    {query.id ? "Update" : "Save"}
                  </Button>
                </Form>
              )}
            </div>
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
    </>
  );
};

export default NewProduct;