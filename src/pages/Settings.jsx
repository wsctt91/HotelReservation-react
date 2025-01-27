import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";

function Settings() {
  return (
    <Row>
      <Heading as="h1">ホテル詳細設定</Heading>
      <UpdateSettingsForm />
    </Row>
  );
}

export default Settings;
