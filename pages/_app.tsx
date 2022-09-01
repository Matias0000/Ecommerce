import '../styles/globals.css'
import "semantic-ui-css/semantic.min.css";
// import 'bootstrap/dist/css/bootstrap.min.css' 
import type { AppProps } from 'next/app'
// import {Layout} from '../component/Layout'
import { StoreProvider } from '../utils/Store';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  // <Layout>
  <StoreProvider>  
    <Component {...pageProps} />
  {/* // </Layout> */}
   </StoreProvider>  
  )
}

export default MyApp
