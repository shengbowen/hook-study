import React, { useState, useCallback, useReducer } from "react";
import { SchemaModel, StringType, DateType, NumberType } from "schema-typed";
import "./index.css";
import loginService from "./loginService";
import Field from "./field";
import { Store, login } from "./store";

const model = SchemaModel({
  username: StringType().isRequired("用户名不能为空"),
  password: StringType().isRequired("密码不能为空"),
  captcha: StringType()
    .isRequired("验证码不能为空")
    .rangeLength(4, 4, "验证码为4位字符"),
});

const LoginForm = () => {
  const { state, dispatch } = Store.useContainer();

  const submit = useCallback(() => {
    const errors = model.check({
      username: state.username,
      password: state.password,
      captcha: state.captcha,
    });

    const hasErrors =
      Object.values(errors).filter((error) => error.hasError).length > 0;

    dispatch({ type: "set", payload: { key: "errors", value: errors } });

    if (hasErrors) return;
    loginService.login(state);
  }, [state]);

  return (
    <div className="login-form">
      <Field
        name="username"
        placeholder="用户名"
        // value={state.username}
        // error={state.errors["username"].errorMessage}
        dispatch={dispatch}
      />
      <Field
        name="password"
        placeholder="密码"
        value={state.password}
        // error={state.errors["password"].errorMessage}
        // dispatch={dispatch}
      />
      <Field
        name="captcha"
        placeholder="验证码"
        value={state.captcha}
        // error={state.errors["captcha"].errorMessage}
        // dispatch={dispatch}
      />
      <button onClick={() => dispatch(login())}>提交</button>
    </div>
  );
};

// demo3
// const initialState = {
//   username: "",
//   password: "",
//   captcha: "",
//   // ++++
//   errors: {
//     username: {},
//     password: {},
//     captcha: {},
//   },
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "set":
//       return {
//         ...state,
//         [action.payload.key]: action.payload.value,
//       };
//     default:
//       return state;
//   }
// }

// const LoginForm = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   const submit = useCallback(() => {
//     const errors = model.check({
//       username: state.username,
//       password: state.password,
//       captcha: state.captcha,
//     });

//     const hasErrors =
//       Object.values(errors).filter((error) => error.hasError).length > 0;

//     dispatch({ type: "set", payload: { key: "errors", value: errors } });

//     if (hasErrors) return;
//     loginService.login(state);
//   }, [state]);

//   return (
//     <div className="login-form">
//       <Field
//         name="username"
//         placeholder="用户名"
//         value={state.username}
//         error={state.errors["username"].errorMessage}
//         dispatch={dispatch}
//       />
//       <Field
//         name="password"
//         placeholder="密码"
//         value={state.password}
//         error={state.errors["password"].errorMessage}
//         dispatch={dispatch}
//       />
//       <Field
//         name="captcha"
//         placeholder="验证码"
//         value={state.captcha}
//         error={state.errors["captcha"].errorMessage}
//         dispatch={dispatch}
//       />
//       <button onClick={submit}>提交</button>
//     </div>
//   );
// };

// demo2
// const LoginForm = () => {
//   const [state, setState] = useState({
//     username: "",
//     password: "",
//     captcha: "",
//     // ++++
//     errors: {
//       username: {},
//       password: {},
//       captcha: {},
//     },
//   });

//   const submit = useCallback(() => {
//     const errors = model.check({
//       username: state.username,
//       password: state.password,
//       captcha: state.captcha,
//     });

//     setState({
//       ...state,
//       errors: errors,
//     });

//     const hasErrors =
//       Object.values(errors).filter((error) => error.hasError).length > 0;

//     if (hasErrors) return;
//     loginService.login(state);
//   }, [state]);

//   const changeUserName = useCallback((e) => {
//     const value = e.target.value;
//     setState((prevState) => {
//       return {
//         ...prevState,
//         username: value,
//       };
//     });
//   }, []);

//   const changePassword = useCallback((e) => {
//     e.persist();
//     setState((pstate) => {
//       return {
//         ...pstate,
//         password: e.target.value,
//       };
//     });
//   }, []);

//   const changeCaptcha = useCallback((e) => {
//     e.persist();
//     setState((state) => {
//       return {
//         ...state,
//         captcha: e.target.value,
//       };
//     });
//   }, []);

//   return (
//     <div className="login-form">
//       <Field
//         placeholder="用户名"
//         value={state.username}
//         error={state.errors["username"].errorMessage}
//         onChange={changeUserName}
//       />
//       <Field
//         placeholder="密码"
//         value={state.password}
//         error={state.errors["password"].errorMessage}
//         onChange={changePassword}
//       />
//       <Field
//         placeholder="验证码"
//         value={state.captcha}
//         error={state.errors["captcha"].errorMessage}
//         onChange={changeCaptcha}
//       />
//       <button onClick={submit}>提交</button>
//     </div>
//   );
// };

// demo1
// const LoginForm = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [captcha, setCaptcha] = useState("");

//   const submit = useCallback(() => {
//     loginService.login({
//       username,
//       password,
//       captcha,
//     });
//   }, [username, password, captcha]);

//   return (
//     <div className="login-form">
//       <input
//         placeholder="用户名"
//         value={username}
//         onChange={(e) => {
//           setUsername(e.target.value);
//         }}
//       ></input>
//       <input
//         placeholder="密码"
//         value={password}
//         onChange={(e) => {
//           setPassword(e.target.value);
//         }}
//       ></input>
//       <input
//         placeholder="验证码"
//         value={captcha}
//         onChange={(e) => {
//           setCaptcha(e.target.value);
//         }}
//       ></input>
//       <button onClick={submit}>提交</button>
//     </div>
//   );
// };
const LoginFormContainer = () => {
  return (
    <Store.Provider>
      <LoginForm />
    </Store.Provider>
  );
};

export default LoginFormContainer;
