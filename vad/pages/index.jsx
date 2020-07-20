import React from "react";
import dynamic from "next/dynamic";

const VAD = dynamic(() => import("../components/vad"), { ssr: false });

export default () => (
  <div>
    <VAD />
  </div>
);
