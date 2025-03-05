import { createPagesServerClient } from '@supabase/auth-helpers-nextjs'

    export default async function handler(req, res) {
      try {
        const supabase = createPagesServerClient({ req, res })
        const { data, error } = await supabase
          .from('lost_items')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5)

        if (error) throw error
        res.status(200).json(data || [])
      } catch (error) {
        console.error('Error fetching lost items:', error)
        res.status(500).json({ error: 'Failed to fetch lost items' })
      }
    }
