import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Ads from "./Ads";
import Ads2 from "./Ads2";
import LeftSideNav from "./LeftSideNav";
import RightSideNav from "./RightSideNav";

const Main: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    handleResize(); // Initial check on mount

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      {/* <Ads2 /> */}
      {!isMobile && (
        <>
          <div className="col-sm-2 sidenav">
            <LeftSideNav />
          </div>
        </>
      )}
      <div className="col-sm-8 bg-img">
        <Outlet />
        <br />
        <br />
      </div>
      {!isMobile && (
        <>
          <div className="col-sm-2 sidenav">
            <RightSideNav />
          </div>
        </>
      )}
      <Ads />
    </div>
  );
};

//     <div>
//       {/* <Ads2 /> */}
//       <div className="col-sm-2 sidenav">
//         <LeftSideNav />
//       </div>
//       <div className="col-sm-8 bg-img">
//         <Outlet />
//         <br />
//         <br />
//       </div>
//       <div className="col-sm-2 sidenav">
//         <RightSideNav />
//       </div>
//       <Ads />
//     </div>
//   );
// };

export default Main;
