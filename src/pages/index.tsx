import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home - tweetx</title>
      </Head>

      <div className="h-screen w-full flex justify-center items-center">
        <Link href="/playground">
          <button className="btn btn-primary">playground</button>
        </Link>
      </div>
    </>
  );
}
