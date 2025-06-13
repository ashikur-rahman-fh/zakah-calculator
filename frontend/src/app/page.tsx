"use client";

import React, { useEffect, useState } from "react";

import { api } from "@/lib/api";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/");
        console.log(response);
        setData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <p>Data from backend: {data ? JSON.stringify(data) : "Loading..."}</p>
    </React.Fragment>
  );
}
