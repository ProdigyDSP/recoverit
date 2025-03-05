import { Container, Typography, TextField, Button, Box } from '@mui/material'
    import Header from '../components/Header'
    import { supabaseClient } from '@supabase/auth-helpers-nextjs'
    import { useUser } from '@supabase/auth-helpers-react'

    export default function ReportFound() {
      const { user } = useUser()

      const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        
        const { error } = await supabaseClient
          .from('found_items')
          .insert({
            user_id: user.id,
            item_name: formData.get('itemName'),
            description: formData.get('description'),
            location: formData.get('location'),
            date_found: formData.get('dateFound')
          })

        if (error) {
          alert('Error reporting item')
        } else {
          alert('Item reported successfully!')
        }
      }

      return (
        <>
          <Header />
          <Container maxWidth="md" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Report Found Item
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
                name="location"
                label="Location Found"
                margin="normal"
              />
              <TextField
                fullWidth
                required
                name="dateFound"
                label="Date Found"
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
