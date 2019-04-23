import React from "react";
import Link from "next/link";

const Home: React.FC = () => (
  <article>
    <h1>Hello Next.js</h1>
    <Link href="/about">
      <a>/about</a>
    </Link>
  </article>
);
export default Home;
