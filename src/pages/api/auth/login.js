import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

    export default async function handler(req, res) {
      const supabase = createPagesServerClient({ req, res })
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
      })
      
      if (error) return res.status(400).json({ error: error.message })
      res.status(200).json(data)
    }
