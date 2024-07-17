import { FormProvider } from "@/Context/FormContext";
import { TabProvider } from "@/Context/TabContext";
import "@/styles/globals.css";
import { PrimeReactProvider } from 'primereact/api';
import { AuthProvider } from "@/Context/AuthContext";

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
