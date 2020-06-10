import { createContainer } from "unstated-next";
import { useReducer, useCallback, useRef, useEffect } from "react";
import { SchemaModel, StringType } from "schema-typed";
import loginService from "./loginService";

const model = SchemaModel({
  username: StringType().isRequired("用户名不能为空"),
  password: StringType().isRequired("密码不能为空"),
  captcha: StringType()
    .isRequired("验证码不能为空")
    .rangeLength(4, 4, "验证码为4位字符"),
});

const initialState = {
  username: "",
  password: "",
  captcha: "",
  // ++++
  errors: {
    username: {},
    password: {},
    captcha: {},
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "set":
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    default:
      return state;
  }
}

export const login = () => {
  return (state, dispatch) => {
    console.log(state);
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
  };
};

function useStore() {
  const [state, _dispatch] = useReducer(reducer, initialState);

  const refs = useRef(state);

  useEffect(() => {
    refs.current = state;
  });

  const dispatch = useCallback(
    (action) => {
      if (typeof action === "function") {
        return action(refs.current, _dispatch);
      } else {
        return _dispatch(action);
      }
    },
    [_dispatch]
  );

  return { state, dispatch };
}

export const Store = createContainer(useStore);
