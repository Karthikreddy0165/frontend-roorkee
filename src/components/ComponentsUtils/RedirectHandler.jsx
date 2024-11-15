import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuth } from "@/Context/AuthContext";
// import ResPass from "./ResPass/ResPass";
export default function RedirectHandler(){
    const {setResetPasswordToken, setUID} = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (typeof window !== 'undefined') {
          const currentURL = window.location.href;
          const urlArray = currentURL.split('/').filter((i) => i !== '');
          const token = urlArray[urlArray.length - 1];
          const uid = urlArray[urlArray.length - 2];

          if (currentURL.includes(`reset-password-confirm/${uid}/${token}`)) {
              setResetPasswordToken(token);
              setUID(uid);
              router.push(`/reset-password-confirm`);

          }
      }
  }, [router]);
    console.log(router)
}