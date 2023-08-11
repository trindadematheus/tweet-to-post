import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <Link href="/playground">
          <button className="btn btn-primary">playground</button>
        </Link>
      </div>
    </>
  );
}
