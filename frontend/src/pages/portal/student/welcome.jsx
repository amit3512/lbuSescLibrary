import { Typography } from "antd";
import { useSelector } from "react-redux";
import lowerFirst from "lodash/lowerFirst";

const { Title, Text } = Typography;
export default function Welcome() {
  const user = useSelector((state) => state.auth?.data);

  console.log("user", user);

  const sentenceStyle = {
    marginBottom: "45%", // Adjust this value to add space along the height
  };
  return (
    <div style={{ marginLeft: 20, marginTop: -30 }}>
      <Title>Hello, {lowerFirst(user?.userName)}!</Title>
      <Text style={sentenceStyle}>Welcome to your portal.</Text>
      <br />
      <Text style={sentenceStyle}>
        Here you can find information about and enrol in any of the courses we
        offer.
      </Text>
      <br />
      <Text style={sentenceStyle}>
        Once you have registered as a student,which happens automatically upon
        enrolling in your first course, you will be able to access and edit your
        student profile.
      </Text>
      <br />
      <Text style={sentenceStyle}>
        You will be able to see the courses you are enrolled in.
      </Text>
      <br />
      <Text>
        Use the Navigation bar above to access the different feature of your
        portal.
      </Text>
    </div>
  );
}
