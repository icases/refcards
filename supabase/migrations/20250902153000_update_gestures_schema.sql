

alter table gestures add column if not exists name text;
alter table gestures add column if not exists description text;
alter table gestures add column if not exists minor_major text;
alter table gestures add column if not exists canupgradetomajor boolean;
alter table gestures add column if not exists penaltytime integer;
alter table gestures add column if not exists isstickpenalty boolean;


alter table gestures enable row level security;
-- Add unique constraint to name column for ON CONFLICT (name)
alter table gestures add constraint gestures_name_key unique (name);
-- Add unique constraint to id column
alter table gestures add constraint gestures_id_key unique (id);
alter table gestures add primary key (id);