// components/RedirectHandler.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const RedirectHandler = () => {
  const router = useRouter();

  useEffect(() => {
    const { asPath } = router;
    const resetPasswordPath = '/reset-password-confirm';
// console.log(asPath, "aspath")
    if (asPath.includes('/api/reset-password-confirm/')) {
      router.replace(resetPasswordPath);
    }
  }, [router]);

  return null;
};

export default RedirectHandler;
