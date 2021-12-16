import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import '../custom.css'
import Head from "next/head";
import { config } from '@fortawesome/fontawesome-svg-core'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faHourglassStart, faHourglassEnd, faStar, faPaperPlane, faUserSlash, faTimes } from '@fortawesome/free-solid-svg-icons'

library.add(faStar, faHourglassEnd, faHourglassStart, faPaperPlane, faUserSlash, faTimes)
config.autoAddCss = false

function App({ Component, pageProps }) {
	return (
	<>
		{ <Head>
			<link href="https://fonts.googleapis.com/css2?family=Oswald&display=swap" rel="stylesheet"/>
		</Head> }
			<Component {...pageProps} />
	</>
	);
	}

export default App;