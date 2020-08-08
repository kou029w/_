import React from "react";
import dynamic from "next/dynamic";

const VAD = dynamic(() => import("../components/vad"), { ssr: false });

const Index = () => (
  <div>
    <VAD />
  </div>
);
export default Index;
