-- Add visibility enum and column to links
CREATE TYPE public.link_visibility AS ENUM ('public', 'admin');

ALTER TABLE public.links 
ADD COLUMN visibility public.link_visibility NOT NULL DEFAULT 'public';

-- Update RLS policy for links to respect visibility
DROP POLICY IF EXISTS "Anyone can view links" ON public.links;

CREATE POLICY "Public can view public links" 
ON public.links 
FOR SELECT 
USING (visibility = 'public');

CREATE POLICY "Admins can view all links" 
ON public.links 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));