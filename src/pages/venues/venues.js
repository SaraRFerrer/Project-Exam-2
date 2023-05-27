import React, { useState } from "react";
import ApiHook from "../../hooks/apiHook";
import VenuesCard from "../../components/cards/VenueCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../../styles/venues.module.css";
import { useNavigate } from "react-router-dom";

function Venues() {
  const navigate = useNavigate();
  const { data, loading, error } = ApiHook(
    "https://api.noroff.dev/api/v1/holidaze/venues?sort=created"
  );

  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredData = data.filter((venue) => {
    const lowerCaseSearch = search.toLowerCase();
    const nameMatch = new RegExp(`\\b${lowerCaseSearch}\\b`, "i");
    const locationMatch = new RegExp(`\\b${lowerCaseSearch}\\b`, "i");

    return (
      nameMatch.test(venue.name.toLowerCase()) ||
      locationMatch.test(venue.location.city.toLowerCase()) ||
      locationMatch.test(venue.location.country.toLowerCase()) ||
      locationMatch.test(venue.location.continent.toLowerCase())
    );
  });

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
    setShowDropdown(e.target.value.length > 0);
  };

  const handleSearchResultClick = (venueId) => {
    navigate(`/specific/${venueId}`);
  };

  console.log(data);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.searchContainer}>
          <h4 className={styles.searchHeading}>
            Hotels, Apartments, Resorts, Houses and more ...
          </h4>
          <div className={styles.searchWrapper}>
            <input
              className={styles.searchBar}
              type="text"
              placeholder="Search venue..."
              value={search}
              onChange={handleSearchInputChange}
            />
            {showDropdown && (
              <div className={styles.dropdown}>
                {filteredData.map((venue) => (
                  <div
                    key={venue.id}
                    onClick={() => handleSearchResultClick(venue.id)}
                    className={styles.dropdownItem}
                  >
                    {venue.name}
                  </div>
                ))}
              </div>
            )}
            <button className={styles.button}>Search</button>
          </div>
        </div>
      </div>
      <Container fluid>
        <Row className={styles.grid}>
          {filteredData.map((venue) => {
            return (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={venue.id}
                className="col-12 col-sm-6 col-md-4 col-lg-3"
              >
                <VenuesCard
                  media={venue.media}
                  id={venue.id}
                  price={venue.price}
                  maxGuests={venue.maxGuests}
                  location={venue.location.city}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Venues;
