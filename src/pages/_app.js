import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'; // Import Head for managing document metadata
import { FormProvider } from "@/Context/FormContext";
import { TabProvider } from "@/Context/TabContext";
import "@/styles/globals.css";
import icon from "../assets/favicon.ico"

import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "@/Context/AuthContext";
import { PageProvider } from "@/Context/PageContext";
import { FilterProvider } from "@/Context/FilterContext";
import { SchemeProvider } from "@/Context/schemeContext";
import { BookmarkProvider } from "@/Context/BookmarkContext";
import { PreferenceProvider } from "@/Context/preferenceContext";
import RedirectHandler from "@/components/ComponentsUtils/RedirectHandler";

import { ClipLoader } from 'react-spinners';  // Import your loader component
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false); // Loading state for page transitions
  const [isFirstLoad, setIsFirstLoad] = useState(true); // To manage first load logic
  const router = useRouter();

  // Handle page transition events
  useEffect(() => {
    const handleStart = () => {
      if (!isFirstLoad) {
        setLoading(true); // Show loader during navigation
      }
    };
    const handleComplete = () => {
      setLoading(false); // Hide loader after navigation is complete
      setIsFirstLoad(false); // After the first load, we show loader on subsequent transitions
    };

    // Adding event listeners for page transitions
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    // Cleanup event listeners on component unmount
    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router, isFirstLoad]);

  console.log(icon)

  return (
    <>

      {/* Add a Head tag for global metadata */}
      <Head>
        <title>launchpad.com</title>
        <link rel="icon" href="/_next/static/media/favicon.e9847d9a.ico" type="image/x-icon" /> {/* Add favicon */}
      </Head>


     <ToastContainer />

      {loading && (
        <div className="loader-overlay">
          {/* You can replace ClipLoader with any other loader/spinner */}
          <ClipLoader size={50} color="#3498db" />
        </div>
      )}

      <PreferenceProvider>
        <FilterProvider>
          <PageProvider>
            <TabProvider>
              <AuthProvider>
                <SchemeProvider>
                  <FormProvider>
                    <PrimeReactProvider>
                      <BookmarkProvider>
                        <div className="flex flex-col min-h-screen">
                          {/* Main Content */}
                          <div className="flex-grow">
                            {/* <RedirectHandler /> */}
                            <Component {...pageProps} />
                          </div>
                        </div>
                      </BookmarkProvider>
                    </PrimeReactProvider>
                  </FormProvider>
                </SchemeProvider>
              </AuthProvider>
            </TabProvider>
          </PageProvider>
        </FilterProvider>
      </PreferenceProvider>
    </>
  );
}
