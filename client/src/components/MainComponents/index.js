import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/auth";

import { Grid, Col } from "../Grid/GridElements";
import MainAsideContent from "./MainAsideContent";
import {
  AsideBtn,
  MainAside,
  MainAsideShiftMenu,
  MainBox,
} from "./MainStyledElements";

const MainComponents = (props) => {
  const asideRef = useRef(null);
  const [showAside, setShowAside] = useState(false);
  const { user } = useContext(AuthContext);
  const handleShowAside = () => setShowAside(!showAside);

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (asideRef.current !== null && !asideRef.current.contains(e.target)) {
        setShowAside(!showAside);
      }
    };

    if (showAside) {
        window.addEventListener("click", pageClickEvent);
    }

    return () => {
        window.removeEventListener("click", pageClickEvent);
    }
  }, [showAside]);

  return (
    <Grid>
      <Col className="full-height">
      <AsideBtn onClick={handleShowAside} className={showAside ? "shiftButton" : "unshiftButton"} />
        <MainAsideShiftMenu ref={asideRef} className={showAside ? "showAside" : "noShowAside"}>
          <MainAsideContent />
        </MainAsideShiftMenu>
        
        <MainAside>
          <MainAsideContent />
        </MainAside>
      </Col>
      <Col span="9" spanMd="6">
        <MainBox>{props.children}</MainBox>
      </Col>
    </Grid>
  );
};

export default MainComponents;
