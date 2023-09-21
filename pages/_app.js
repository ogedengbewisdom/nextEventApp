import '../styles/globals.css';
import Layout from '../components/layout/Layout';
import Head from "next/head";
import { NotificationProvider } from '../store/notification-context';

function MyApp({ Component, pageProps }) {
  return (

      <NotificationProvider>
          <Layout>
            <Head>
              <title>Next Events</title>
              <meta name='description' content='NextJs Events.' />
              <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
            <Component {...pageProps} />
          </Layout>
      </NotificationProvider>
      
  );
}

export default MyApp;
