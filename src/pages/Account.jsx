import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading as="h1">アカウント</Heading>

      <Row>
        <Heading as="h3">ユーザーデータ更新</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row>
        <Heading as="h3">パスワード更新</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
