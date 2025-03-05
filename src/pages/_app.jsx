import { CacheProvider } from '@emotion/react'
    import createCache from '@emotion/cache'
    import { ThemeProvider, createTheme } from '@mui/material/styles'
    import CssBaseline from '@mui/material/CssBaseline'
    import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
    import { SessionContextProvider } from '@supabase/auth-helpers-react'
    import { useState } from 'react'

    const clientSideEmotionCache = createCache({ key: 'css', prepend: true })

    const theme = createTheme({
      palette: {
        mode: 'light',
        primary: {
          main: '#1976d2',
        },
        secondary: {
          main: '#9c27b0',
        },
      },
    })

    export default function MyApp({ Component, pageProps, emotionCache = clientSideEmotionCache }) {
      const [supabaseClient] = useState(() => createBrowserSupabaseClient())

      return (
        <CacheProvider value={emotionCache}>
          <SessionContextProvider
            supabaseClient={supabaseClient}
            initialSession={pageProps.initialSession}
          >
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </SessionContextProvider>
        </CacheProvider>
      )
    }
