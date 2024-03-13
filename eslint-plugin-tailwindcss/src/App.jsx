import "./App.css";

function Text(props) {
  // eslint-disable-next-line react/prop-types
  return <div className={`w-1 ${props.className}`}>red text</div>;
}

function App() {
  return (
    <>
      {/* eslint-disable-next-line tailwindcss/no-contradicting-classname */}
      <Text className="container w-2 w-3" />
      {/* これはパス */}
      <Text className="container w-2" />
    </>
  );
}

export default App;
