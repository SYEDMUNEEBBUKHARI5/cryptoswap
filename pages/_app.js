import styles from "../styles/globals.css";
import {Navbar} from "../Components/index";

const MyApp = ({Component, pageProps})=>(
    <div>
    <Navbar />
    <Component {...pageProps}  />
    </div>
)

export default MyApp;