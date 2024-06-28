import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/HomePage");
  }, [router]);

  return (
    <>
      {/* I am not adding anything in it  */}
    </>
  );
}
