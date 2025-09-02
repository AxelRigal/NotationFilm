import useAuth from "../../hook/useAuth";

export default function Login() {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <>
      {user ? (
        <button onClick={signOut}>Log out</button>
      ) : (
        <button onClick={signInWithGoogle}>Login</button>
      )}
    </>
  );
}
