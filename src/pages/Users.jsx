import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function NewUsers() {
  return (
    <>
      <Heading as="h1">新しいユーザーを作成みよう</Heading>
      <SignupForm />
    </>
  );
}

export default NewUsers;
