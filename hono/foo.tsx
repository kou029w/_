/** @jsxImportSource npm:hono/jsx */

export function Foo(props: { messages: string[] }) {
  return (
    <>
      <h1>Hello Hono!</h1>
      <ul>
        {props.messages.map((message) => (
          <li>{message}!</li>
        ))}
      </ul>
    </>
  );
}
