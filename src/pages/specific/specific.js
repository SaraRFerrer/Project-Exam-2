import React from "react";
import { useParams } from "react-router-dom";
import ApiHook from "../../hooks/apiHook";
import SpecificCard from "../../components/cards/SpecificCard";

function Venue() {
  const params = useParams();

  const { data, loading, error } = ApiHook(
    `https://api.noroff.dev/api/v1/holidaze/venues/${params.id}?_owner=true&_bookings=true
    `
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;
  console.log(data);

  return (
    <div>
      <SpecificCard 
       media={data.media}
       name={data.name}
       description={data.description}
       price={data.price}
       meta={data.meta}/>
      

    </div>
  )
}

export default Venue;
