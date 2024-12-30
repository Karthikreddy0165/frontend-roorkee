import { FormProvider } from "@/Context/FormContext";
import { TabProvider } from "@/Context/TabContext";
import "@/styles/globals.css";

import { PrimeReactProvider } from "primereact/api";
import { AuthProvider } from "@/Context/AuthContext";
import { PageProvider } from "@/Context/PageContext";
import { FilterProvider } from "@/Context/FilterContext";
import { PreferenceProvider } from "@/Context/preferenceContext";
import RedirectHandler from "@/components/ComponentsUtils/RedirectHandler";
import dotenv from "dotenv";
import Footer from "@/components/Footer";

dotenv.config();

export default function App({ Component, pageProps }) {
  return (
    <PreferenceProvider>
      <FilterProvider>
        <PageProvider>
          <TabProvider>
            <AuthProvider>
              <FormProvider>
                <PrimeReactProvider>
                  <div className="flex flex-col min-h-screen">
                    {/* Main Content */}
                    <div className="flex-grow">
                      {/* <RedirectHandler /> */}
                      <Component {...pageProps} />
                    </div>
                    {/* Footer */}
                    <Footer />
                  </div>
                </PrimeReactProvider>
              </FormProvider>
            </AuthProvider>
          </TabProvider>
        </PageProvider>
      </FilterProvider>
    </PreferenceProvider>
  );
}
