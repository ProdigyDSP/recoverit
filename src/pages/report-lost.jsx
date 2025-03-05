import { Container, Typography, TextField, Button, Box } from '@mui/material'
    import Header from '../components/Header'
    import { supabaseClient } from '@supabase/auth-helpers-nextjs'
    import { useUser } from '@supabase/auth-helpers-react'

    export default function ReportLost() {
      const { user } = useUser()

      const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        
        const { error } = await supabaseClient
          .from('lost_items')
          .insert({
            user_id: user.id,
            item_name: formData.get('itemName'),
            description: formData.get('description'),
            last_seen: formData.get('lastSeen'),
            date_lost: formData.get('dateLost')
          })

        if (error) {
          alert('Error reporting lost item')
        } else {
          alert('Lost item reported successfully!')
        }
      }

      return (
        <>
          <Header />
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Report Lost Item
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                required
                name="itemName"
                label="Item Name"
                margin="normal"
              />
              <TextField
                fullWidth
                required
                name="description"
                label="Description"
                margin="normal"
                multiline
                rows={4}
              />
              <TextField
                fullWidth
                required
                name="lastSeen"
                label="Last Seen Location"
                margin="normal"
              />
              <TextField
                fullWidth
                required
                name="dateLost"
                label="Date Lost"
                type="date"
                margin="normal"
                InputLabelProps={{ shrink: true }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ mt: 3 }}
              >
                Submit Report
              </Button>
            </Box>
          </Container>
        </>
      )
    }
