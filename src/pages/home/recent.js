import ApiHook from "../../hooks/apiHook";
import VenuesCard from "../../components/cards/VenueCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

function RecentVenues() {
  const { data, loading, error } = ApiHook(
    "https://api.noroff.dev/api/v1/holidaze/venues"
  );

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <Container>
        <h2>Recently Added Venues</h2>
        <Row>
          {data.map((venue) => {
            return (
              <VenuesCard img={venue.media} key={venue.id} id={venue.id} />
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default RecentVenues;
