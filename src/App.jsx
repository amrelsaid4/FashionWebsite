import Head from "./components/header/Head";
import Header from "./components/header/Header";
import Nav from "./components/header/Nav";

import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider
      // @ts-ignore
      value={colorMode}
    >
      <ThemeProvider
        // @ts-ignore
        theme={theme}
      >
        <CssBaseline />

        <Header />
        <Nav />
        <Head />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
