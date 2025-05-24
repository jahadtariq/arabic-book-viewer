import { GlobalStyle } from './styles/globalStyles';
import { Book } from './components/Book';
import { MobileBook } from './components/MobileBook';
import { useMediaQuery } from './hooks/useMediaQuery';
import "./App.css"

export default function App() {
  const isMobileOrTablet = useMediaQuery(1024); // Use the same breakpoint as before

  return (
    <>
      <GlobalStyle />
      {isMobileOrTablet ? <MobileBook /> : <Book />}
    </>
  );
}