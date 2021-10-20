import Link from 'next/link';
import path from 'path';
import fs from 'fs/promises';


function HomePage(props) {

  // pull products out of props
  const {products} = props;

  // render the list dynamically
  return (
    <ul>
     {products.map(product=>(
       <li key={product.id}>
       <Link href={`/products/${product.id}`}>{product.title}</Link></li>
       ))}
    </ul>
  );
}

export async function getStaticProps(context)
{
 const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json')
// get json data from the json file
 const jsonData = await fs.readFile(filePath);
 // get the actual data
const data = JSON.parse(jsonData);

// if there is no data e.g. because a problem with a database
// redirect to the no-data file
if (!data){
 return{
   redirect: {
     desctination: '/no-data'
   }
 }
}

// if the code fails to fetch data show the 404 page
if (data.products.length === 0) {
 return{notFound: true};
}

 return{props: {
   products: data.products
 }, 
 revalidate: 600,
};
}

export default HomePage;
