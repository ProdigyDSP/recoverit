import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

    export default async function handler(req, res) {
      const supabase = createPagesServerClient({ req, res })
      const { error } = await supabase.auth.signOut()
      
      if (error) return res.status(400).json({ error: error.message })
      res.status(200).json({ success: true })
    }
