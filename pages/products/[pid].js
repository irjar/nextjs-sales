import { Fragment } from 'react';
import path from 'path';
import fs from 'fs/promises';

function ProductDetailPage(props){

  // extract the loaded data about the product
    const {loadedProduct} = props;

    // show the Loading text while waiting for the page to load
  if(!loadedProduct) {
    return <p>Loading...</p>
  }

    return(<Fragment>
        <h1>{loadedProduct.title}</h1>
        <p>{loadedProduct.description}</p>
        </Fragment>

);
}

 async function grabData(){

  const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
 // get json data from the json file
  const jsonData = await fs.readFile(filePath);
  // get the actual data
 const data = JSON.parse(jsonData);

 return data;
 }

export async function getStaticProps(context){
 const {params} = context;

 const productId = params.pid;

 const data = await getData();
// filter data for the products with the specific id
 const product = data.products.find(product => product.id === productId);

 // if the product was not predefined return a notfound object
 // set to true
 if(!product){
  return{notFound: true};
 }

 return{
  props: {
      loadedProduct: product,
  },
 };
}


export async function getStaticPaths() {
  const data = await getData();

  // read the ids we want to support from the file
const ids = data.products.map(product => product.id);
const pathsWithParams = ids.map((id) => ({params: {pid: id}}));

  return {
    paths: pathsWithParams,
    // if the product id does not exist render a page
    fallback: true,
  };
}


export default ProductDetailPage;