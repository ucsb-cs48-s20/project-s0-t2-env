import Layout from "../components/Layout";
import { requiredAuth } from "../utils/ssr";

export const getServerSideProps = requiredAuth;

function PersonalInputPage(props) {
  const user = props.user;

  return (
    <Layout user={user}>
      <p
        style={{
          fontSize: "20px",
          margin: "10px",
        }}
      >
        See how you compare to the average person in your city!
      </p>
    </Layout>
  );
}

export default PersonalInputPage;
