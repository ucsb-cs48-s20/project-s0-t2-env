import Layout from "../components/Layout";
import Carousel from "react-bootstrap/Carousel";

import { optionalAuth } from "../utils/ssr";

export const getServerSideProps = optionalAuth;

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

function HomePage(props) {
  const user = props.user;

  return (
    <Layout user={user}>
      <style jsx>
        {`
          img {
            width: 1000px;
            height: 300px;
          }
        `}
      </style>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://images.squarespace-cdn.com/content/v1/5702eb0222482eac526a6b9d/1459906335363-6R9A12TCR6P1KLNX4UK2/ke17ZwdGBToddI8pDm48kNJzIzhHeIWprLM41ONemAFZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIdas_SVgL8pSVashnXWXNcS5jaGplD4PFZ5hSBE73lPYKMshLAGzx4R3EDFOm1kBS/Sunshine+Coast+Pumps+-+Pump+Filtration+Irrigation+Projects.jpg?format=2500w%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20alt=%22Water%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%3C/img%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class=%22carousel-item%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class=%22d-block%20w-100%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20src=%22https://www.baaqmd.gov/~/media/dotgov/images/section-images/8_section2-jpg.jpg?h=312&la=en&w=816&hash=64DCD2D5724F9F7F36404319201D558A%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20alt=%22Air%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%3C/img%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%20class=%22carousel-item%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class=%22d-block%20w-100%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20src=%22https://assets.weforum.org/article/image/large_LiSyr56ECs8p4TINfhoKnM2of_u9kWL2yLapGD5HLX8.png%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20alt=%22CO2%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%3C/img%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class=%22carousel-control-prev%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20href=%22#carousel1%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20role=%22button%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20data-slide=%22prev%22%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class=%22carousel-control-prev-icon%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20aria-hidden=%22true%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%3C/span%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class=%22sr-only%22%3EPrevious%3C/span%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/a%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class=%22carousel-control-next%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20href=%22#carousel1%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20role=%22button%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20data-slide=%22next%22%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20class=%22carousel-control-next-icon%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20aria-hidden=%22true%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%3C/span%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cspan%20class=%22sr-only%22%3ENext%3C/span%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/a%3E%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%20%20%20%20%20%20%20%20%20%20%20%3Cdiv%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ctitle%3EEnvironmental%20Impacts%20Dashboard%3C/title%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ch1%20className=%22header%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Welcome%20to%20the%20Environmental%20Impacts%20Dashboard%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/h1%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ch2%20className=%22subhead2%22%3ENext.js%3C/h2%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20This%20application%20provides%20a%20dashboard%20of%20information%20about%20your%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20city's%20environmental%20impact.%20When%20possible,%20the%20app%20shows%20you%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20things%20like:%20amount%20of%20car%20traffic,%20public%20transportation%20options,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20news%20about%20policies%20enacted.%20The%20user%20can%20tweak%20numbers%20and%20see%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20how%20that%20would%20impact%20emissions.%20Specifically,%20the%20app:%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cul%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Gives%20people%20suggestions%20(lifestyle%20changes)%20on%20how%20they%20can%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20lower%20their%20emissions.%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/li%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3ETracks%20air%20quality,%20CO2%20emissions,%20water%20usage%3C/li%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Allows%20users%20to%20track%20their%20own%20impact%20on%20the%20specific%20data%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20sets%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/li%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/ul%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/p%3E%20%20%20%20%20%20%20%20%20%20%20%3C/div%3E%20%20%20%20%20%20%20%20%20%3C/body%3E%20%20%20%20%20%20%20%3C/Layout%3E%20%20%20%20%20%3C/html%3E%20%20%20);%20}%20%20{%20%20%20/*%20%3Ch3%20className=%22subhead3%22%3EGoleta%20Environmental%20Data%3C/h3%3E%20%20%20%20%20%20%20%20%20%3Cul%3E%20%20%20%20%20%20%20%20%20%20%20%3Cp%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cb%3ETap%20Water%20Quality%20Details:%20%3C/b%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cimg%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20src=%22https://www.gallatintn.gov/ImageRepository/Document?documentID=1624%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20align=%22right%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20width=%22500%22%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20height=%22200%22%20%20%20%20%20%20%20%20%20%20%20%20%20%3E%3C/img%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cul%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3EGoleta,%20California%3C/li%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3EServes:%2086,946%3C/li%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3EData%20available:%202012%E2%80%942017%3C/li%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3ESource:%20Surface%20water%3C/li%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Cli%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3Ca%20href=%22https://www.ewg.org/tapwater/system.php?pws=CA4210004%22%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20Click%20here%20to%20see%20more%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/a%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/li%3E%20%20%20%20%20%20%20%20%20%20%20%20%20%3C/ul%3E%20%20%20%20%20%20%20%20%20%20%20%3C/p%3E%20%20%20%20%20%20%20%20%20%3C/ul%3E%20%20%20%20%20%20%20%20%20--%3E%20%20*/%20}%20%20{%20%20%20/*%20%3Cstyle%20jsx%3E%20{%60%20%20%20%20%20%20%20%20%20%20%20%20%20@import%20url(%22https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap%22);%20%20%20%20%20%20%20%20%20%20%20%20%20.header%20{%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20color:%20white;%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20text-shadow:%20-1px%20-1px%200%20#000,%201px%20-1px%200%20#000,%20-1px%201px%200%20#000,%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%201px%201px%200%20#000;%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20background-image:%20url(%22https://alliswall.com/file/2238/1920x1200/16:9/green-bamboo-background-wide.jpg%22);%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20font-family:%20%22Montserrat%22,%20sans-serif;%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20width:%201425px;%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20height:%20100px;%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20text-align:%20center;%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20line-height:%20100px;%20%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20%20%20%20.subhead2%20{%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20color:%20#3269a8;%20%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20%20%20%20.subhead3%20{%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20color:%20#3269a8;%20%20%20%20%20%20%20%20%20%20%20%20%20}%20%20%20%20%20%20%20%20%20%20%20%60}%20%20%20%20%20%20%20%20%20%3C/style%3E%20%20%20%20%20%20%20%20%3C/div%3E%20%20%20%20%20%3C/Layout%3E%20%20%20);%20}%20*/%20}%20%20export%20default%20HomePage;"
            alt="Water"
          />
          <Carousel.Caption>
            <h3>Water Pollution </h3>
            <p>
              Is the contamination of water bodies, usually as a result of human
              activities.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.baaqmd.gov/~/media/dotgov/images/section-images/8_section2-jpg.jpg?h=312&la=en&w=816&hash=64DCD2D5724F9F7F36404319201D558A"
            alt="Air"
          />

          <Carousel.Caption>
            <h3>Air Pollution</h3>
            <p>
              Occurs when harmful or excessive quantities of substances are
              introduced into Earth's atmosphere.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://assets.weforum.org/article/image/large_LiSyr56ECs8p4TINfhoKnM2of_u9kWL2yLapGD5HLX8.png"
            alt="CO2"
          />

          <Carousel.Caption>
            <h3>CO2 emissions</h3>
            <p>
              Refers to the release of greenhouse gases into the atmosphere over
              a specified area and period of time.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
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
      </div>
    </Layout>
  );
}

{
  /* <h3 className="subhead3">Goleta Environmental Data</h3>
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
        -->  */
}

{
  /* <style jsx> {`
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
} */
}

export default HomePage;
