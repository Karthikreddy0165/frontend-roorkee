import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/App");
  }, [router]);

  return (
    <>
      {/* I am not adding anything in it  */}
    </>
  );
}
