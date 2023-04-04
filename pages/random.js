import { useEffect, useState } from "react";
import { Spinner, Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";

const RandomArtwork = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [random, setRandom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the list of object IDs from the API
    fetch(
      "https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&departmentId=11&q=*"
    )
      .then((res) => res.json())
      .then((data) => {
        // Select a random object ID from the list
        const randomIndex = Math.floor(Math.random() * data.objectIDs.length);
        const randomID = data.objectIDs[randomIndex];
        setRandom(randomID);

        // Set a timer for 3 seconds.
        const timer = setTimeout(() => {
          setIsLoading(false);
        }, 3000);

        Promise.all([timer]).then(() => {
          clearTimeout(timer);
          setIsLoading(false);
        });
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Row>
          <Col>
            <Spinner animation="border" />
          </Col>
        </Row>
      ) : error ? (
        <Row>
          <Col>
            <p>{error}</p>
          </Col>
        </Row>
      ) : (
        <Row>
          <Col>
            <ArtworkCardDetail objectID={random} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default RandomArtwork;


