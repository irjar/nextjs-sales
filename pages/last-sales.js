import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalesPage(props) {

    // pre-rendered sales are used as an initial state
  const [sales, setSales] = useState(props.sales);

  const fetcher = (url) => fetch(url).then((r) => r.json());

  // the initial state of sales will be overwritten by the result
  // of the client site data fetching
  const { data, error } = useSWR(
    "https://nextjs-project-firebase-ipa",
    fetcher
  );

  // transform the data received from the database from object to an array
  useEffect(() => {
    if (data) {
      const transformedSales = [];
      for (const key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      setSales(transformedSales);
    }
  }, [data]);

  //     const [isLoading, setLoading] = useState(false);

  //   // fetch data from inside the component
  //   // send the http request to a web server and read the data from the
  //   // response and update the state of this component
  //   // to output the data once we get the response
  //    useEffect(() => {
  //      setLoading(true);
  //      fetch("https://nextjs-project-firebase-ipa")
  //       .then((response) => response.json())
  //       .then((data) => {
  //         // transform data received from the database into an array
  //         // by looping through keys in the object
  //         const transformedSales = [];

  //         for (const key in data) {
  //           transformedSales.push({
  //             id: key,
  //             username: data[key].username,
  //             volume: data[key].volume,
  //           });
  //         }

  //         setSales(transformedSales);
  //         setLoading(false);
  //       });
  //   }, []);

  //   if (isLoading) {
  //     return <p>Loading...</p>;
  //   }

  // if (!sales) {
  //     return <p>No data yet</p>;
  //   }

  // if we get an error show an error message
  if (error) {
    return <p>Failed to load</p>;
  }

  // if we do not have the data yet then show a loading message
  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const response = await fetch(
    "https://nextjs-project-firebase-ipa"
  );
  const data = await response.json();

  // transform data received from the database into an array
  // by looping through keys in the object
  const transformedSales = [];

  for (const key in data) {
    transformedSales.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }
  return {
    props: {
      sales: transformedSales,
    },
    revalidate: 10,
  };
}
export default LastSalesPage;
