-- Create found_items table
    CREATE TABLE found_items (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES auth.users NOT NULL,
      item_name TEXT NOT NULL,
      description TEXT NOT NULL,
      location TEXT NOT NULL,
      date_found DATE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Create lost_items table
    CREATE TABLE lost_items (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      user_id UUID REFERENCES auth.users NOT NULL,
      item_name TEXT NOT NULL,
      description TEXT NOT NULL,
      last_seen TEXT NOT NULL,
      date_lost DATE NOT NULL,
      created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
    );

    -- Enable RLS for both tables
    ALTER TABLE found_items ENABLE ROW LEVEL SECURITY;
    ALTER TABLE lost_items ENABLE ROW LEVEL SECURITY;

    -- Create policies for found_items
    CREATE POLICY "Users can view all found items" ON found_items
      FOR SELECT USING (true);

    CREATE POLICY "Users can insert their own found items" ON found_items
      FOR INSERT WITH CHECK (auth.uid() = user_id);

    -- Create policies for lost_items
    CREATE POLICY "Users can view all lost items" ON lost_items
      FOR SELECT USING (true);

    CREATE POLICY "Users can insert their own lost items" ON lost_items
      FOR INSERT WITH CHECK (auth.uid() = user_id);
