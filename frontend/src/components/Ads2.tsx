import React from 'react';

const Ads2: React.FC = () => {
  // Function to generate a random number between 1 and 999
  const getRandomNumber = () => {
    return Math.floor(Math.random() * 999) + 1;
  };

  // Function to generate a Picsum URL with a random seed
  const generatePicsumUrl = (seed: number) => {
    return `https://picsum.photos/seed/${seed}/500/200`;
  };

  // Generate a random seed
  const randomSeed = getRandomNumber();

  return (
    <div>
      <div className="container text-center">
        <h5>Top Advertisements (AdSense placeholder)</h5>
        <br />
        <div className="row" style={{ display: "flex", justifyContent: "center" }}>
          {[1, 2, 3].map((index) => (
            <div className="col-sm-2" key={index}>
              <img
                src={generatePicsumUrl(randomSeed + index)}
                className="img-responsive"
                style={{ width: "100%" }}
                alt={`Ad ${index}`}
              />
              {/* <p>Ad {index}</p> */}
            </div>
          ))}
        </div>
      </div>
      <hr/>
    </div>
  );
};

export default Ads2;