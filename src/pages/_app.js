import "@/styles/globals.css";
import { PrimeReactProvider } from 'primereact/api';
import { FormProvider } from '../Context/FormContext';

export default function App({ Component, pageProps }) {
  return (
    <FormProvider>
      <PrimeReactProvider>
        <Component {...pageProps} />
      </PrimeReactProvider>
    </FormProvider>
  );
}
