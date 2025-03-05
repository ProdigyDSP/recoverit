import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

    export default async function handler(req, res) {
      try {
        const supabase = createPagesServerClient({ req, res })
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) throw error
        res.status(200).json({ session })
      } catch (error) {
        console.error('Session error:', error)
        res.status(500).json({ error: 'Failed to get session' })
      }
    }
