import { Link, Links, LiveReload, Meta, Outlet } from 'remix';
import globalStylesUrl from '~/styles/global.css';

export const links = () => [{ rel: 'stylesheet', href: globalStylesUrl }];

export const meta = () => {
  const description = 'Remix first trial on 2022';
  const keywords = 'remix, js, react, javascript';

  return {
    description,
    keywords
  };
};

export default function App() {
  return <Document title="Remix 2022 01"><Layout><Outlet /></Layout></Document>
}

function Document({ children, title }) {
  return (
    <html lang='en'>
      <head>
        <title>{title}</title>
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        {/* This "Outlet" means remix router which is built on the top of react router dom !!! */}
        { process.env.NODE_ENV === "development" && <LiveReload />}
        <LiveReload/>
      </body>
    </html>
  )
}

function Layout({ children }) {
  return (
    <>
      <nav className="navbar">
        <Link to='/' className='logo'>Remix</Link>
        <ul className='nav'>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        {children}
      </div>
    </>
  )
}

export function ErrorBoundary({error}) {
  console.log(error);

  return (
    <Document>
      <Layout>
        <h1>Error:</h1>
        <pre>{error.message}</pre>
      </Layout>
    </Document>
  );
}
