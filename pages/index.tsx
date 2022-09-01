
import {Button,Card,Container,Grid} from 'semantic-ui-react'
import { useRouter } from 'next/router'

import Link from "next/link";
import Products from "./products";
import {Layout} from '../component/Layout'
import ProductItem from '../components/ProductItem'
import data from '../utils/data'
import 'bootstrap/dist/css/bootstrap.min.css' 
import { Navbar2 } from '../component/NavBar2';


function HomePage({product=[]}) {
  const router = useRouter();
  return (
    <>
    <Navbar2></Navbar2>
    {/* <Layout> */}
    
    {/* <div className=''> */}
      <Container className="bg--900 p-20 text-black">
        <h1 className="text-5xl font-bold">NextMongo Apps</h1>
        <p className="my-4 text-black text-lg">Ecommerce Coder House Proyecto final</p>
        {/* <Link href='/products'> <h1>Agregar Productos</h1></Link> */}
        {/* <Button primary onClick={() =>router.push(`/products`)}>Agregar Productos</Button> */}
      </Container>
    {/* </div> */}
    {/* </Layout> */}
      <Products product={product}/>


      <div className="row row-cols-2 row-cols-md-4 g-4">
            {data.products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </div>


    </>

  );
}

export default HomePage;


export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/products");
  const product = await res.json();

  return {
    props: {
        product,
    },
  };
}