import { FormProvider } from '@/Context/FormContext';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <FormProvider>
      <Component {...pageProps} />
    </FormProvider>
  );
}

export default MyApp;
