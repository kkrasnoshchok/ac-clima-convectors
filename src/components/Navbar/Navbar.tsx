import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <Link href="/">Home</Link>
      {session ? (
        <>
          <span style={{ marginLeft: "1rem" }}>
            Welcome, {session.user?.name || session.user?.email}
          </span>
          <button
            onClick={() => signOut()}
            style={{ marginLeft: "1rem", cursor: "pointer" }}
          >
            Sign Out
          </button>
        </>
      ) : (
        <>
          <Link href="/login" style={{ marginLeft: "1rem" }}>
            Login
          </Link>
          <Link href="/register" style={{ marginLeft: "1rem" }}>
            Register
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
