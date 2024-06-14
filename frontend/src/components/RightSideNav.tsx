import React from 'react'

const RightSideNav = () => {

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
                <img src={"https://i.imgur.com/W3FbeXE.jpeg"} alt="logo" className="img-responsive" style={{ width: "100%" }} />
            </div>
            <br />
            <div className="card custom-well">
                <img
                    src={generatePicsumUrl(getRandomNumber(3))}
                    className="img-responsive"
                    style={{ width: "100%" }}
                    alt='Ad 1'
                />
                (Ad 1)
            </div>
            <br />
            <div className="card custom-well">
                <img
                    src={generatePicsumUrl(getRandomNumber(4))}
                    className="img-responsive"
                    style={{ width: "100%" }}
                    alt='Ad 2'
                />
                (Ad 2)
            </div>
        </div>
    )
}

export default RightSideNav