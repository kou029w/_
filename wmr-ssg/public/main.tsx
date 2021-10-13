import {
  LocationProvider,
  ErrorBoundary,
  Router,
  lazy,
  hydrate,
  prerender as ssr,
} from "preact-iso";

// @ts-expect-error
import pages from "dir:./pages";

const routes = (pages as string[]).map((name: string) => {
  const filename = name.replace(/\.tsx$/, "");
  const url = `/${filename.replace(/_index$/, "")}`;
  const Route = lazy(() => import(`./pages/${filename}.tsx`));

  console.log(url);

  return { url, Route };
});

function App() {
  return (
    <LocationProvider>
      <header>
        <nav>
          <a href="/">Home</a> / <a href="/hello">Hello</a>
        </nav>
      </header>
      <ErrorBoundary>
        <Router>
          {routes.map(({ Route, url }) => (
            <Route path={url} />
          ))}
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

export async function prerender() {
  return await ssr(<App />);
}

if (typeof window !== "undefined") {
  hydrate(<App />, document.body);
}
