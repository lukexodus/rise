import React from "react";
import { useNavigate } from "react-router-dom";
import { Analytics } from "../components/Analytics";

export function AnalyticsPage() {
  const navigate = useNavigate();

  return (
    <Analytics />
  );
}