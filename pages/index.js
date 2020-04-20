import Layout from "../components/Layout";
import { optionalAuth } from "../utils/ssr";

// export const getServerSideProps = optionalAuth;

// function HomePage(props) {
//   const user = props.user;

//   return (
//     <Layout user={user}>
//       {user ? (
//         <div>
//           You're logged in! Here's what the server knows about you:
//           <pre>{JSON.stringify(user, null, "\t")}</pre>
//         </div>
//       ) : (
//         <div>You're not logged in!</div>
//       )}
//     </Layout>
//   );
export const getServerSideProps = optionalAuth;

function HomePage() {
  return (
    <Layout>
      <div>
        <title>Environmental Impacts Dashboard</title>

        <h1 className="header">
          Welcome to the Environmental Impacts Dashboard
        </h1>

        <h2 className="subhead2">Next.js</h2>
        <p>
          This application provides a dashboard of information about your city's
          environmental impact. When possible, the app shows you things like:
          amount of car traffic, public transportation options, news about
          policies enacted. The user can tweak numbers and see how that would
          impact emissions. Specifically, the app:
          <ul>
            <li>
              Gives people suggestions (lifestyle changes) on how they can lower
              their emissions.
            </li>
            <li>Tracks air quality, CO2 emissions, water usage</li>
            <li>
              Allows users to track their own impact on the specific data sets
            </li>
          </ul>
        </p>

        <h3 className="subhead3">Goleta Environmental Data</h3>
        <ul>
          <p>
            <b>Tap Water Quality Details: </b>
            <img
              src="https://www.gallatintn.gov/ImageRepository/Document?documentID=1624"
              align="right"
              width="500"
              height="200"
            ></img>
            <ul>
              <li>Goleta, California</li>
              <li>Serves: 86,946</li>
              <li>Data available: 2012—2017</li>
              <li>Source: Surface water</li>
              <li>
                <a href="https://www.ewg.org/tapwater/system.php?pws=CA4210004">
                  Click here to see more
                </a>
              </li>
            </ul>
          </p>
        </ul>

        <style jsx>
          {" "}
          {`
            @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap");
            .header {
              color: white;
              text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
                1px 1px 0 #000;
              background-image: url("https://alliswall.com/file/2238/1920x1200/16:9/green-bamboo-background-wide.jpg");
              font-family: "Montserrat", sans-serif;
              width: 1425px;
              height: 100px;
              text-align: center;
              line-height: 100px;
            }
            .subhead2 {
              color: #3269a8;
            }
            .subhead3 {
              color: #3269a8;
            }
          `}
        </style>
      </div>
    </Layout>
  );
}

export default HomePage;
