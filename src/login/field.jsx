import React from "react";
import { Store } from "./store";

// const Filed = ({ placeholder, name }) => {
//   const { state, dispatch } = Store.useContainer();
//   console.log(placeholder, "rendering");
//   const error = state.errors[name].errorMessage;

//   return (
//     <div className="form-field">
//       <input
//         placeholder={placeholder}
//         value={state[name]}
//         onChange={(e) =>
//           dispatch({
//             type: "set",
//             payload: { key: name, value: e.target.value },
//           })
//         }
//       />
//       {error && <span style={{ fontSize: 10, color: "red" }}>{error}</span>}
//     </div>
//   );
// };

// export default React.memo(Filed);

const Filed = ({ placeholder, error, name, dispatch, value }) => {
  console.log(placeholder, "rendering");
  return (
    <div className="form-field">
      <input
        placeholder={placeholder}
        value={value}
        onChange={(e) =>
          dispatch({
            type: "set",
            payload: { key: name, value: e.target.value },
          })
        }
      />
      {error && <span style={{ fontSize: 10, color: "red" }}>{error}</span>}
    </div>
  );
};

// export default React.memo(Filed);
const FiledInner = React.memo(Filed);

const FiledContainer = (props) => {
  const { state, dispatch } = Store.useContainer();
  const value = state[props.name];
  const error = state.errors[props.name].errorMessage;
  return (
    <FiledInner {...props} value={value} dispatch={dispatch} error={error} />
  );
};

const connect = (mapStateProps) => {
  return (comp) => {
    const Inner = React.memo(comp);

    return (props) => {
      const { state, dispatch } = Store.useContainer();
      return (
        <Inner
          {...props}
          {...mapStateProps(state, props)}
          dispatch={dispatch}
        />
      );
    };
  };
};

// export default FiledContainer;

export default connect((state, props) => {
  return {
    value: state[props.name],
    error: state.errors[props.name].errorMessage,
  };
})(Filed);
