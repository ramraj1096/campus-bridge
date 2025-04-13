import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ExploreFeatures = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/explore-features/dashboard");
  }, [navigate]);

  return null; // or a loader/spinner if needed
};
