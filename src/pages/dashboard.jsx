import { Container, Typography, Box, Grid, Paper } from '@mui/material'
    import Header from '../components/Header'
    import { useUser } from '@supabase/auth-helpers-react'
    import { supabaseClient } from '@supabase/auth-helpers-nextjs'
    import { useEffect, useState } from 'react'

    export default function Dashboard() {
      const { user } = useUser()
      const [foundItems, setFoundItems] = useState([])
      const [lostItems, setLostItems] = useState([])

      useEffect(() => {
        const fetchData = async () => {
          const { data: found } = await supabaseClient
            .from('found_items')
            .select('*')
            .order('created_at', { ascending: false })

          const { data: lost } = await supabaseClient
            .from('lost_items')
            .select('*')
            .order('created_at', { ascending: false })

          setFoundItems(found)
          setLostItems(lost)
        }

        fetchData()
      }, [])

      return (
        <>
          <Header />
          <Container maxWidth="xl" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Dashboard
            </Typography>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Recently Found Items
                  </Typography>
                  {foundItems.map((item) => (
                    <Box key={item.id} sx={{ mb: 2, p: 2, border: '1px solid #eee' }}>
                      <Typography variant="h6">{item.item_name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Found at: {item.location}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date Found: {new Date(item.date_found).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 3 }}>
                  <Typography variant="h5" component="h2" gutterBottom>
                    Recently Lost Items
                  </Typography>
                  {lostItems.map((item) => (
                    <Box key={item.id} sx={{ mb: 2, p: 2, border: '1px solid #eee' }}>
                      <Typography variant="h6">{item.item_name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Last Seen: {item.last_seen}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Date Lost: {new Date(item.date_lost).toLocaleDateString()}
                      </Typography>
                    </Box>
                  ))}
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </>
      )
    }
