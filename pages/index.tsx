import type { NextPage } from 'next';
import Head from 'next/head';
import { Main } from '../src/Main';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tritreeeee</title>
        <meta name="description" content="Build your own Tritree for fun" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
};

export default Home;
