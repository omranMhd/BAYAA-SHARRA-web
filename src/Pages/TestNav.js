import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

function TestNav() {
  let { adId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/ad-details/${adId}`);
  }, [navigate, adId]);
  return <div>TestNav</div>;
}

export default TestNav;
