import { useState, useEffect } from "react";
import { Button, Form, Grid, Loader } from "semantic-ui-react";

import { useRouter } from "next/router";

const NewProduct = () => {
  const [newProduct, setNewProduct] = useState({
    title:"",
    price:"",
    code:"",
    stock:"",
    description:"",
    thumbnail:"",
  });
  const { query, push } = useRouter();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const getProduct = async () => {
    const res = await fetch("http://localhost:3000/api/products/" + query.id);
    const data = await res.json();
    setNewProduct({ title: data.title, 
      price: data.price, 
      thumbnail: data.thumbnail,
      code:data.code,
      stock:data.stock,
      description:data.description
    });
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
      await updateProduct();
    } else {
      await createProduct();
    }

    await push("/");
  };

  const handleChange = (e) =>
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value    });

  const validate = () => {
    let errors = {};

    if (!newProduct.title) {
      errors.title = "name is required";
    }
    if (!newProduct.price) {
        errors.price = "price is required";
      }
    if (!newProduct.thumbnail) {
      errors.thumbnail = "thumbnail is required";
    }
    if (!newProduct.code) {
      errors.code = "code is required";
    }
    if (!newProduct.stock) {
      errors.stock = "stock is required";
    }
    if (!newProduct.description) {
      errors.description = "description is required";
    }
  

    return errors;
  };

  const createProduct = async () => {
    try {
      await fetch("http://localhost:3000/api/products", {
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

  const updateProduct = async () => {
    try {
      await fetch("http://localhost:3000/api/products/" + query.id, {
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
                        ? { content: "Please enter a name", pointing: "below" }
                        : null
                    }
                    label="title"
                    placeholder="title"
                    name="title"
                    onChange={handleChange}
                    value={newProduct.name}
                    autoFocus
                  />
                  <Form.Input
                    error={
                      errors.price
                        ? { content: "Please enter a price", pointing: "below" }
                        : null
                    }
                    label="price"
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
                  <Form.Input
                    error={
                      errors.code
                        ? { content: "Please enter a title", pointing: "below" }
                        : null
                    }
                    label="code"
                    placeholder="code"
                    name="code"
                    onChange={handleChange}
                    value={newProduct.code}
                    autoFocus
                  />
                  <Form.Input
                    error={
                      errors.stock
                        ? { content: "Please enter a title", pointing: "below" }
                        : null
                    }
                    label="stock"
                    placeholder="stock"
                    name="stock"
                    onChange={handleChange}
                    value={newProduct.stock}
                    autoFocus
                  />
                  <Form.Input
                    error={
                      errors.description
                        ? { content: "Please enter a title", pointing: "below" }
                        : null
                    }
                    label="description"
                    placeholder="description"
                    name="description"
                    onChange={handleChange}
                    value={newProduct.description}
                    autoFocus
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
  );
};

export default NewProduct;