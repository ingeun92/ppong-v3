import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-w-screen flex min-h-screen flex-col items-center justify-start">
      <nav className="bg-primary sticky top-0 w-full p-8">
        <div className="flex w-full items-center justify-around font-extrabold text-white">
          <Link className="mr-64 text-4xl" href="/">
            PPONG
          </Link>
          <Link
            className="hover:text-highlight active:text-highlight/75 ml-64 text-xl"
            href="/score"
          >
            SCORE
          </Link>
          <Link
            className="hover:text-highlight active:text-highlight/75 text-xl"
            href="/history"
          >
            HISTORY
          </Link>
          <Link
            className="hover:text-highlight active:text-highlight/75 text-xl"
            href="/leaderboard"
          >
            LEADERBOARD
          </Link>
        </div>
      </nav>
      <div className="w-full">{children}</div>
    </main>
  );
}
