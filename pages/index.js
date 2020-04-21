import Layout from "../components/Layout";
//import { optionalAuth } from "../utils/ssr";

//export const getServerSideProps = optionalAuth;

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
//export const getServerSideProps = optionalAuth;

function HomePage() {
  return (
    <html lang="en">
      <Layout>
        <head>
          <meta charset="utf-8"></meta>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          ></meta>
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          ></link>
          <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></script>
          <style jsx>
            {" "}
            {`
              .carousel-inner {
                width: 1000px;
                height: 300px;
              }
            `}
          </style>
        </head>
        <body>
          <div id="carousel1" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
              <li
                data-target="#carousel1"
                data-slide-to="0"
                class="active"
              ></li>
              <li data-target="#carousel1" data-slide-to="1"></li>
              <li data-target="#carousel1" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  src="https://images.squarespace-cdn.com/content/v1/5702eb0222482eac526a6b9d/1459906335363-6R9A12TCR6P1KLNX4UK2/ke17ZwdGBToddI8pDm48kNJzIzhHeIWprLM41ONemAFZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PIdas_SVgL8pSVashnXWXNcS5jaGplD4PFZ5hSBE73lPYKMshLAGzx4R3EDFOm1kBS/Sunshine+Coast+Pumps+-+Pump+Filtration+Irrigation+Projects.jpg?format=2500w"
                  alt="Water"
                ></img>
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="https://www.baaqmd.gov/~/media/dotgov/images/section-images/8_section2-jpg.jpg?h=312&la=en&w=816&hash=64DCD2D5724F9F7F36404319201D558A"
                  alt="Air"
                ></img>
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="https://assets.weforum.org/article/image/large_LiSyr56ECs8p4TINfhoKnM2of_u9kWL2yLapGD5HLX8.png"
                  alt="CO2"
                ></img>
              </div>
            </div>
            <a
              class="carousel-control-prev"
              href="#carousel1"
              role="button"
              data-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Previous</span>
            </a>
            <a
              class="carousel-control-next"
              href="#carousel1"
              role="button"
              data-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="sr-only">Next</span>
            </a>
          </div>
          <div>
            <title>Environmental Impacts Dashboard</title>

            <h1 className="header">
              Welcome to the Environmental Impacts Dashboard
            </h1>

            <h2 className="subhead2">Next.js</h2>
            <p>
              This application provides a dashboard of information about your
              city's environmental impact. When possible, the app shows you
              things like: amount of car traffic, public transportation options,
              news about policies enacted. The user can tweak numbers and see
              how that would impact emissions. Specifically, the app:
              <ul>
                <li>
                  Gives people suggestions (lifestyle changes) on how they can
                  lower their emissions.
                </li>
                <li>Tracks air quality, CO2 emissions, water usage</li>
                <li>
                  Allows users to track their own impact on the specific data
                  sets
                </li>
              </ul>
            </p>
          </div>
        </body>
      </Layout>
    </html>
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
