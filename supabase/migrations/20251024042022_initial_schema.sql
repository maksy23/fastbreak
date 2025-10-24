-- Create venues table
CREATE TABLE public.venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT,
  capacity INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Enable RLS on venues
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;

-- RLS Policies for venues
CREATE POLICY "Users can view their own venues"
  ON public.venues FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own venues"
  ON public.venues FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own venues"
  ON public.venues FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own venues"
  ON public.venues FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for venues
CREATE INDEX venues_user_id_idx ON public.venues(user_id);

-- Create events table
CREATE TABLE public.events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  sport_type TEXT NOT NULL,
  date_time TIMESTAMPTZ NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL
);

-- Enable RLS on events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Users can view their own events"
  ON public.events FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own events"
  ON public.events FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own events"
  ON public.events FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own events"
  ON public.events FOR DELETE
  USING (auth.uid() = user_id);

-- Indexes for events
CREATE INDEX events_user_id_idx ON public.events(user_id);
CREATE INDEX events_date_time_idx ON public.events(date_time);
CREATE INDEX events_sport_type_idx ON public.events(sport_type);

-- Create event_venues junction table
CREATE TABLE public.event_venues (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, venue_id)
);

-- Enable RLS on event_venues
ALTER TABLE public.event_venues ENABLE ROW LEVEL SECURITY;

-- RLS Policies for event_venues
CREATE POLICY "Users can view their own event venues"
  ON public.event_venues FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_venues.event_id
      AND events.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert their own event venues"
  ON public.event_venues FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_venues.event_id
      AND events.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete their own event venues"
  ON public.event_venues FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.events
      WHERE events.id = event_venues.event_id
      AND events.user_id = auth.uid()
    )
  );

-- Indexes for event_venues
CREATE INDEX event_venues_event_id_idx ON public.event_venues(event_id);
CREATE INDEX event_venues_venue_id_idx ON public.event_venues(venue_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_venues_updated_at
  BEFORE UPDATE ON public.venues
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
