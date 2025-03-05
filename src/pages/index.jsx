import { Container, Box, Typography, Button, Grid, Paper, Avatar } from '@mui/material'
    import Header from '../components/Header'
    import { useEffect, useState } from 'react'

    const testimonials = [
      {
        name: 'John Doe',
        text: 'RecoverIt helped me find my lost wallet within hours! Amazing service!',
        avatar: '/avatars/1.jpg'
      },
      {
        name: 'Jane Smith',
        text: 'I found a phone and was able to return it to its owner quickly. Great platform!',
        avatar: '/avatars/2.jpg'
      }
    ]

    export default function Home() {
      const [foundItems, setFoundItems] = useState([])
      const [lostItems, setLostItems] = useState([])
      const [loading, setLoading] = useState(true)

      useEffect(() => {
        const fetchListings = async () => {
          try {
            const [foundRes, lostRes] = await Promise.all([
              fetch('/api/listings/found'),
              fetch('/api/listings/lost')
            ])
            
            const foundData = await foundRes.json()
            const lostData = await lostRes.json()
            
            setFoundItems(foundData.slice(0, 3))
            setLostItems(lostData.slice(0, 3))
          } catch (error) {
            console.error('Error fetching listings:', error)
          } finally {
            setLoading(false)
          }
        }

        fetchListings()
      }, [])

      return (
        <>
          <Header />
          
          {/* Hero Section */}
          <Box
            sx={{
              backgroundImage: 'linear-gradient(to bottom right, #1976d2, #9c27b0)',
              minHeight: '100vh',
              py: 8,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Container maxWidth="xl">
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Typography variant="h2" component="h1" gutterBottom sx={{ color: 'white', fontWeight: 'bold' }}>
                    Lost & Found Made Simple
                  </Typography>
                  <Typography variant="h5" component="p" gutterBottom sx={{ color: 'white', mb: 4 }}>
                    RecoverIt SA helps you find lost items and return found items to their rightful owners
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button variant="contained" color="secondary" size="large" href="/report-found">
                      Report Found Item
                    </Button>
                    <Button variant="outlined" color="inherit" size="large" href="/report-lost">
                      Report Lost Item
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* How It Works Section */}
          <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
            <Container maxWidth="xl">
              <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
                How It Works
              </Typography>
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      🕵️‍♀️ Found Something?
                    </Typography>
                    <Typography>
                      1. Report found items with details and location
                    </Typography>
                    <Typography>
                      2. Help reunite items with their owners
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      😥 Lost Something?
                    </Typography>
                    <Typography>
                      1. Create a lost item report
                    </Typography>
                    <Typography>
                      2. Get notified when matching items are found
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                    <Typography variant="h5" component="h3" gutterBottom>
                      🤝 Community Driven
                    </Typography>
                    <Typography>
                      1. Connect with others in your area
                    </Typography>
                    <Typography>
                      2. Help return lost items to their owners
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Container>
          </Box>

          {/* Latest Listings Section */}
          <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="xl">
              <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
                Latest Listings
              </Typography>
              <Grid container spacing={4}>
                {loading ? (
                  <Grid item xs={12}>
                    <Typography align="center">Loading listings...</Typography>
                  </Grid>
                ) : (
                  <>
                    {foundItems.map((item) => (
                      <Grid item xs={12} md={4} key={item.id}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            Found: {item.item_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Location: {item.location}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {new Date(item.date_found).toLocaleDateString()}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                    {lostItems.map((item) => (
                      <Grid item xs={12} md={4} key={item.id}>
                        <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                          <Typography variant="h6" component="h3" gutterBottom>
                            Lost: {item.item_name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Last Seen: {item.last_seen}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Date: {new Date(item.date_lost).toLocaleDateString()}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}
                  </>
                )}
              </Grid>
            </Container>
          </Box>

          {/* Testimonials Section */}
          <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
            <Container maxWidth="xl">
              <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6 }}>
                What Our Users Say
              </Typography>
              <Grid container spacing={4}>
                {testimonials.map((testimonial, index) => (
                  <Grid item xs={12} md={6} key={index}>
                    <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar src={testimonial.avatar} sx={{ mr: 2 }} />
                        <Typography variant="h6">{testimonial.name}</Typography>
                      </Box>
                      <Typography>{testimonial.text}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Container>
          </Box>

          {/* Ad Banner Section */}
          <Box sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="xl">
              <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Join Our Community Today!
                </Typography>
                <Typography variant="h6" component="p" gutterBottom sx={{ mb: 4 }}>
                  Be part of the movement that helps reunite lost items with their owners
                </Typography>
                <Button variant="contained" color="secondary" size="large" href="/register">
                  Get Started
                </Button>
              </Paper>
            </Container>
          </Box>

          {/* Footer Section */}
          <Box component="footer" sx={{ py: 4, bgcolor: 'primary.main', color: 'white' }}>
            <Container maxWidth="xl">
              <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">RecoverIt SA</Typography>
                  <Typography variant="body2">
                    Helping people recover lost items since 2023
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Quick Links</Typography>
                  <Typography variant="body2">
                    <a href="/about" style={{ color: 'white' }}>About Us</a>
                  </Typography>
                  <Typography variant="body2">
                    <a href="/contact" style={{ color: 'white' }}>Contact</a>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Typography variant="h6">Legal</Typography>
                  <Typography variant="body2">
                    <a href="/privacy" style={{ color: 'white' }}>Privacy Policy</a>
                  </Typography>
                  <Typography variant="body2">
                    <a href="/terms" style={{ color: 'white' }}>Terms of Service</a>
                  </Typography>
                </Grid>
              </Grid>
              <Box sx={{ mt: 4, pt: 2, borderTop: '1px solid rgba(255, 255, 255, 0.12)' }}>
                <Typography variant="body2" align="center">
                  © 2023 RecoverIt SA. All rights reserved.
                </Typography>
              </Box>
            </Container>
          </Box>
        </>
      )
    }
