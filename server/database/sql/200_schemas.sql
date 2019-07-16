create schema app_public;
create schema app_private;

grant usage on schema app_public to graphiledemo_visitor;

-- This allows inserts without granting permission to the serial primary key column.
alter default privileges for role graphiledemo in schema app_public grant usage, select on sequences to graphiledemo_visitor;
