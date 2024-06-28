import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    router.push("/HomePage");
  }, [router]);

  return (
    <>
      {/* This can be left empty or include some loading state if needed */}
    </>
  );
}
