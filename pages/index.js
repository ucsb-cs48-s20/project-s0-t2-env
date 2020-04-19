export default function Index() {
    return (
        <div>
            <title>Environmental Impacts Dashboard</title>

            <h1>Welcome to the Environmental Impacts Dashboard</h1>

            <h2>Next.js</h2>
            <p>
                This application provides a dashboard of information about your city's environmental impact.
                When possible, the app shows you things like: amount of car traffic, public transportation options, news about policies enacted.
                The user can tweak numbers and see how that would impact emissions. Specifically, the app:
                <ul>
                    <li>Gives people suggestions (lifestyle changes) on how they can lower their emissions.</li>
                    <li>Tracks air quality, CO2 emissions, water usage</li>
                    <li>Allows users to track their own impact on the specific data sets</li>
                </ul>
            </p>

            <h3>Goleta Environmental Data</h3>
            <ul>
                <p>
                    <b>Tap Water Quality Details: </b>
                    <ul>
                        <li>Goleta, California</li>
                        <li>Serves: 86,946</li>
                        <li>Data available: 2012—2017</li>
                        <li>Source: Surface water</li>
                        <li><a href="https://www.ewg.org/tapwater/system.php?pws=CA4210004">Click here to see more</a></li>
                    </ul>
                </p>
            </ul>
        </div>
    );
}