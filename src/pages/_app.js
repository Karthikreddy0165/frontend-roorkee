import { FormProvider } from "@/Context/FormContext";
import { TabProvider } from "@/Context/TabContext";
import "@/styles/globals.css";

import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider } from "@/Context/AuthContext";
import { PageProvider } from "@/Context/PageContext";
import {FilterProvider} from "@/Context/FilterContext";
import { PreferenceProvider } from "@/Context/preferenceContext";
import RedirectHandler from "@/components/ComponentsUtils/RedirectHandler";
import dotenv from 'dotenv'

dotenv.config()

// console.log("this is from .env" ,process.env.REACT_APP_BACKEND_URL)
export default function App({ Component, pageProps }) {

  return (
    <PreferenceProvider>
    <FilterProvider>
    <PageProvider>
    <TabProvider>
    <AuthProvider>
      <FormProvider>
        <PrimeReactProvider>
          <>
            {/* <RedirectHandler/> */}
            <Component {...pageProps} />
          </>
        </PrimeReactProvider>
      </FormProvider>
    </AuthProvider>
    </TabProvider>
    </PageProvider>
    </FilterProvider>
    </PreferenceProvider>
  );
}
