import { useRouter } from "next/router";

export function getStaticPaths() {
  return { paths: [{ params: { path: "test" } }], fallback: true };
}

export function getStaticProps({ params }: { params: unknown }) {
  return { props: params };
}

export default function ({ path }: { path: string }) {
  const { query } = useRouter();
  return <pre>{JSON.stringify({ path, ...query }, null, "  ")}</pre>;
}
