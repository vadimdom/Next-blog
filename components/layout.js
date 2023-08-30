import Head from 'next/head';
import Link from 'next/link';

const Layout = ({ children, home }) => (
  <div className="container py-8 mx-auto flex flex-col items-center">
    <Head>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className="min-w-full">{children}</main>
    {!home && (
      <div>
        <Link href="/">← Back to home</Link>
      </div>
    )}
  </div>
);

export default Layout;
