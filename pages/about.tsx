import React from "react";
import Link from "next/link";

const About: React.FC = () => (
  <article>
    <h1>About</h1>
    <Link href="/">
      <a>Back to Home</a>
    </Link>
  </article>
);
export default About;
