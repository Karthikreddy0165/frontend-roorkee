import "@/styles/globals.css";
import { PrimeReactProvider } from 'primereact/api';
import { FormProvider } from "@/Context/FormContext";
import { AuthProvider } from "./AuthContext";
import { TabProvider } from "@/Context/TabContext";

export default function App({ Component, pageProps }) {
  return (
    <TabProvider>
    <AuthProvider>
      <FormProvider>
        <PrimeReactProvider>
          <Component {...pageProps} />
        </PrimeReactProvider>
      </FormProvider>
    </AuthProvider>
    </TabProvider>
  );
}
