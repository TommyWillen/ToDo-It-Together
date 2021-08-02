import { useEffect, useRef, useState } from "react";

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
      <Col className="full-height" as="aside">
      <AsideBtn onClick={handleShowAside} className={showAside ? "shiftButton" : "unshiftButton"} />
        <MainAsideShiftMenu ref={asideRef} className={showAside ? "showAside" : "noShowAside"} as="nav">
          <MainAsideContent />
        </MainAsideShiftMenu>
        
        <MainAside as="nav">
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
