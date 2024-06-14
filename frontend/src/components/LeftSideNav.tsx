import React from 'react'

const LeftSideNav = () => {

    const getRandomNumber = (num: number) => {
        return Math.floor(Math.random() * 999) + num;
    };

    const generatePicsumUrl = (seed: number) => {
        return `https://picsum.photos/seed/${seed}/500/200`;
    };
    // const randomSeed = getRandomNumber();

    return (
        <div>
            <br />
            <div className="card">
                <img src={"https://i.imgur.com/8ANMhXL.jpeg"} alt="logo" className="img-responsive" style={{ width: "100%" }} />
            </div>
            <br />
            <div className="card custom-well">
                <img
                    src={generatePicsumUrl(getRandomNumber(1))}
                    className="img-responsive"
                    style={{ width: "100%" }}
                    alt='Ad 3'
                />
                (Ad 3)
            </div>
            <br />
            <div className="card custom-well">
                <img
                    src={generatePicsumUrl(getRandomNumber(2))}
                    className="img-responsive"
                    style={{ width: "100%" }}
                    alt='Ad 4'
                />
                (Ad 4)
            </div>
        </div>
    )
}

export default LeftSideNav