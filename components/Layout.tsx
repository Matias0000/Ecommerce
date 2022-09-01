import Head from "next/head";
import { Navbar2 } from "./NavBar2";

export const Layout = ({ children }) => (
  <>
    <Head>
      <title>Products App</title>
    </Head>
    <Navbar2 />

    <main className="bg-zinc-800 min-h-screen">{children}</main>
  </>
);