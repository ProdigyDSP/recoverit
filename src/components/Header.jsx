import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material'
    import { useEffect, useState } from 'react'
    import { useRouter } from 'next/router'

    export default function Header() {
      const router = useRouter()
      const [user, setUser] = useState(null)
      const [mounted, setMounted] = useState(false)
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        setMounted(true)
        const fetchUser = async () => {
          try {
            const response = await fetch('/api/auth/session')
            if (!response.ok) throw new Error('Failed to fetch session')
            
            const data = await response.json()
            setUser(data?.session?.user || null)
          } catch (error) {
            console.error('Error fetching session:', error)
            setUser(null)
          } finally {
            setLoading(false)
          }
        }
        fetchUser()
      }, [])

      const handleLogin = async () => {
        try {
          const response = await fetch('/api/auth/login', { method: 'POST' })
          if (!response.ok) throw new Error('Login failed')
          router.reload()
        } catch (error) {
          console.error('Login error:', error)
        }
      }

      const handleLogout = async () => {
        try {
          const response = await fetch('/api/auth/logout', { method: 'POST' })
          if (!response.ok) throw new Error('Logout failed')
          router.reload()
        } catch (error) {
          console.error('Logout error:', error)
        }
      }

      if (!mounted) {
        return (
          <AppBar position="static" elevation={0}>
            <Container maxWidth="xl">
              <Toolbar disableGutters>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  RecoverIt SA
                </Typography>
              </Toolbar>
            </Container>
          </AppBar>
        )
      }

      return (
        <AppBar position="static" elevation={0}>
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                RecoverIt SA
              </Typography>
              {!loading && (
                <Box sx={{ display: 'flex', gap: 2 }}>
                  {user ? (
                    <>
                      <Button color="inherit" href="/dashboard">
                        Dashboard
                      </Button>
                      <Button color="inherit" onClick={handleLogout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button color="inherit" onClick={handleLogin}>
                        Login
                      </Button>
                      <Button variant="contained" color="secondary" onClick={handleLogin}>
                        Register
                      </Button>
                    </>
                  )}
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      )
    }
