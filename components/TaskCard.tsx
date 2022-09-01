import { Button } from "./ui/Button";
import Link from "next/link";
import { useRouter } from "next/router";
// import {Button,Card,Container,Grid} from 'semantic-ui-react'

export function TaskCard({ products }) {
  const router = useRouter();

  return (
    <div className="bg-gray-800 p-10 text-white rounded-md">
      <img src={products.thumbnail} style={{width:"300px"}}></img>
      <Link href={`/products/${products._id}`}>
        <h1 className="text-xl font-bold">{products.title}</h1>
      </Link>
      <h4>Precio ${products.price}</h4>
      <Button onClick={() => router.push(`/products/${products._id}`)}>View</Button>
      <Button onClick={() => router.push(`/products/${products._id}/edit`)}>
        Edit
      </Button>
      {/* <Button onClick={() => router.push(`/carrito/${products._id}/edit`)}>
        Agregar al carrito
      </Button> */}
    </div>
  );
}

export default TaskCard;