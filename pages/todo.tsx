import React, { FormEvent } from "react";
import { MDXContext } from "@mdx-js/react";

type State = {
  id: number;
  todo: Map<number, string>;
};
type Action =
  | {
      type: "add";
      body: string;
    }
  | {
      type: "delete";
      key: number;
    };

const initialState: State = {
  id: 0,
  todo: new Map(),
};

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "add":
      state.todo.set(state.id, action.body);
      return { ...state, id: state.id + 1 };
    case "delete":
      state.todo.delete(action.key);
      return { ...state };
  }
}

export default () => {
  const components = React.useContext(MDXContext);
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const onSubmit = React.useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const body =
        new FormData(event.currentTarget as HTMLFormElement)
          .get("body")
          ?.toString() || "";
      if (body.length === 0) return;
      dispatch({
        type: "add",
        body,
      });
    },
    [dispatch]
  );

  const H1 = components.h1 || "h1";
  const Ul = components.ul || "ul";
  const Li = components.li || "li";

  return (
    <>
      <H1>ToDo List</H1>
      <form onSubmit={onSubmit}>
        <input type="text" key={state.id} name="body" autoFocus />
        <input type="submit" name="submit" value="+" />
      </form>
      <Ul>
        {[...state.todo].map(([key, body]) => (
          <Li key={key}>
            <input
              type="checkbox"
              name={`${key}-checkbox`}
              onChange={() => dispatch({ type: "delete", key })}
            />
            {body}
          </Li>
        ))}
      </Ul>
    </>
  );
};
