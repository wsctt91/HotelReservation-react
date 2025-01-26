import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";
import { useForm } from "react-hook-form";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { signup, isLoading } = useSignup();
  // *useForm是一个自定义的Hook，它返回了一个对象，包含了我们需要的所有方法和属性
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  function onSubmit({ fullName, email, password }) {
    signup(
      { fullName, email, password },
      {
        onSettled: reset,
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="アカウント" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "この項目は必須です" })}
        />
      </FormRow>

      <FormRow label="メールアドレス" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "この項目は必須です",
            pattern: {
              value: /\S+@\S+\.\S+/, // 正则表达式 用于验证邮箱格式
              message: "Please provider a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="パスワード (最小８文字)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          disabled={isLoading}
          {...register("password", {
            required: "この項目は必須です",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="パスワードを確認"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isLoading}
          {...register("passwordConfirm", {
            required: "この項目は必須です",
            // validate代表自定义验证规则
            validate: (value) =>
              value === getValues().password || "パスワードが一致しません",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          variation="secondary"
          type="reset"
          disabled={isLoading}
          onClick={reset}
        >
          キャンセル
        </Button>
        <Button disabled={isLoading}>新規登録</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
