import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { CheckFormError, FormError } from "../components/form-error";
import { Helmet } from "react-helmet-async";
import {
  loginMutation,
  loginMutationVariables,
} from "../__generated__/loginMutation";
import nuberLogo from "../image/logo.svg";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { authToken, isLoggedInVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../constants";
import { LoginInput } from "../__generated__/globalTypes";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      error
      token
    }
  }
`;

export const Login = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<LoginInput>({
    mode: "onChange",
  });

  const onCompleted = (data: loginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
      authToken(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { loading, data: loginMutationResult }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5 mt-8 lg:mt-28">
        <Helmet>
          <title>로그인 | Nuber</title>
        </Helmet>
        <img src={nuberLogo} alt="nuber eats" className="w-52 mb-5" />
        <h3 className="w-full font-medium text-left text-2xl">로그인</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 my-5 w-full"
        >
          <input
            {...register("email", {
              required: "email is required",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            type="email"
            placeholder="이메일을 입력하세요"
            className="input"
          />
          <CheckFormError errorMessage={errors.email?.message} />
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"허용되지 않는 이메일 주소 입니다."} />
          )}
          <input
            {...register("password", {
              required: "password is required",
              minLength: 10,
            })}
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="input"
          />
          <CheckFormError errorMessage={errors.password?.message} />
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"비밀번호는 최소 10자리 이상입니다."} />
          )}
          <Button canClick={isValid} loading={loading} actionText="다음" />
          <CheckFormError errorMessage={loginMutationResult?.login.error} />
        </form>
        <div>
          Nuber는 처음이신가요?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            계정 만들기
          </Link>
        </div>
      </div>
    </div>
  );
};
