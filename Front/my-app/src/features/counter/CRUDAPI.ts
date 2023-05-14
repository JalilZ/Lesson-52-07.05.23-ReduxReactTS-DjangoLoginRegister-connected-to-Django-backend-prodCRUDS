import axios from 'axios'
import Product from '../../Models/Product';


export function getAll() {
  console.log('test API')
  return new Promise<{ data: any }>((resolve) =>
      axios.get("http://127.0.0.1:8000/products/").then( res => resolve({ data: res.data }))
  );
}

export function add(prod: Product) {
  console.log('add API')
  return new Promise<{ data: Product }>((resolve) =>
      axios.post("http://127.0.0.1:8000/products/", prod).then( res => resolve({ data: res.data }))
  );
}

export function deleteProd(prodID: number) {
  console.log('remove API')
  return new Promise<{ data: Product }>((resolve) =>
      axios.delete(`http://127.0.0.1:8000/products/${prodID}`).then( res => resolve({ data: res.data }))
  );
}

export function update(prod: Product) {
  console.log('update API')
  return new Promise<{ data: Product }>((resolve) =>
      axios.put(`http://127.0.0.1:8000/products/${prod.id}`, prod).then( res => resolve({ data: res.data }))
  );
}