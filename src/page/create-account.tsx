import { useMutation, gql } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { Button } from "../components/button";
import { CheckFormError, FormError } from "../components/form-error";
import nuberLogo from "../image/logo.svg";
import {
  createAccountMutation,
  createAccountMutationVariables,
} from "../__generated__/createAccountMutation";
import { CreateAccountInput, UserRole } from "../__generated__/globalTypes";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

export const CreateAccount = () => {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateAccountInput>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const history = useHistory();
  const onCompleted = (data: createAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("계정이 생성되었습니다! 로그인 하세요!");
      history.push("/");
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<createAccountMutation, createAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({
        variables: {
          createAccountInput: { email, password, role },
        },
      });
    }
  };
  return (
    <div className="h-screen flex flex-col items-center">
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5 mt-8 lg:mt-28">
        <Helmet>
          <title>계정생성 | Nuber</title>
        </Helmet>
        <img src={nuberLogo} alt="nuber_logo" className="w-52 mb-5" />
        <h3 className="w-full font-medium text-left text-2xl">시작하기</h3>
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
            <FormError errorMessage={"허용되지 않는 이메일 주소입니다"} />
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
            <FormError errorMessage={"비밀번호는 최소 10자리 이상입니다"} />
          )}
          <select {...register("role", { required: true })} className="input">
            {Object.keys(UserRole).map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <Button canClick={isValid} loading={loading} actionText="계정 생성" />
          <CheckFormError
            errorMessage={createAccountMutationResult?.createAccount.error}
          />
        </form>
        <div>
          이미 회원가입 하셨나요?{" "}
          <Link to="/" className="text-lime-600 hover:underline">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};
