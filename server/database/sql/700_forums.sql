-- Forum example

create table app_public.forums (
  id serial primary key,
  slug text not null check(length(slug) < 30 and slug ~ '^([a-z0-9]-?)+$') unique,
  name text not null check(length(name) > 0),
  description text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.forums enable row level security;
create trigger _100_timestamps
  before insert or update on app_public.forums
  for each row
  execute procedure app_private.tg__update_timestamps();

comment on table app_public.forums is
  E'A subject-based grouping of topics and posts.';
comment on column app_public.forums.slug is
  E'An URL-safe alias for the `Forum`.';
comment on column app_public.forums.name is
  E'The name of the `Forum` (indicates its subject matter).';
comment on column app_public.forums.description is
  E'A brief description of the `Forum` including it''s purpose.';

create policy select_all on app_public.forums for select using (true);
create policy insert_admin on app_public.forums for insert with check (app_public.current_user_is_admin());
create policy update_admin on app_public.forums for update using (app_public.current_user_is_admin());
create policy delete_admin on app_public.forums for delete using (app_public.current_user_is_admin());
grant select on app_public.forums to graphiledemo_visitor;
grant insert(slug, name, description) on app_public.forums to graphiledemo_visitor;
grant update(slug, name, description) on app_public.forums to graphiledemo_visitor;
grant delete on app_public.forums to graphiledemo_visitor;

--------------------------------------------------------------------------------

create table app_public.topics (
  id serial primary key,
  forum_id int not null references app_public.forums on delete cascade,
  author_id int not null default app_public.current_user_id() references app_public.users on delete cascade,
  title text not null check(length(title) > 0),
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.topics enable row level security;
create trigger _100_timestamps
  before insert or update on app_public.topics
  for each row
  execute procedure app_private.tg__update_timestamps();

comment on table app_public.topics is
  E'@omit all\nAn individual message thread within a Forum.';
comment on column app_public.topics.title is
  E'The title of the `Topic`.';
comment on column app_public.topics.body is
  E'The body of the `Topic`, which Posts reply to.';

create policy select_all on app_public.topics for select using (true);
create policy insert_admin on app_public.topics for insert with check (author_id = app_public.current_user_id());
create policy update_admin on app_public.topics for update using (author_id = app_public.current_user_id() or app_public.current_user_is_admin());
create policy delete_admin on app_public.topics for delete using (author_id = app_public.current_user_id() or app_public.current_user_is_admin());
grant select on app_public.topics to graphiledemo_visitor;
grant insert(forum_id, title, body) on app_public.topics to graphiledemo_visitor;
grant update(title, body) on app_public.topics to graphiledemo_visitor;
grant delete on app_public.topics to graphiledemo_visitor;

create function app_public.topics_body_summary(
  t app_public.topics,
  max_length int = 30
)
returns text
language sql
stable
set search_path from current
as $$
  select case
    when length(t.body) > max_length
    then left(t.body, max_length - 3) || '...'
    else t.body
    end;
$$;

--------------------------------------------------------------------------------

create table app_public.posts (
  id serial primary key,
  topic_id int not null references app_public.topics on delete cascade,
  author_id int not null default app_public.current_user_id() references app_public.users on delete cascade,
  body text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table app_public.posts enable row level security;
create trigger _100_timestamps
  before insert or update on app_public.posts
  for each row
  execute procedure app_private.tg__update_timestamps();

comment on table app_public.posts is
  E'@omit all\nAn individual message thread within a Forum.';
comment on column app_public.posts.id is
  E'@omit create,update';
comment on column app_public.posts.topic_id is
  E'@omit update';
comment on column app_public.posts.author_id is
  E'@omit create,update';
comment on column app_public.posts.body is
  E'The body of the `Topic`, which Posts reply to.';
comment on column app_public.posts.created_at is
  E'@omit create,update';
comment on column app_public.posts.updated_at is
  E'@omit create,update';

create policy select_all on app_public.posts for select using (true);
create policy insert_admin on app_public.posts for insert with check (author_id = app_public.current_user_id());
create policy update_admin on app_public.posts for update using (author_id = app_public.current_user_id() or app_public.current_user_is_admin());
create policy delete_admin on app_public.posts for delete using (author_id = app_public.current_user_id() or app_public.current_user_is_admin());
grant select on app_public.posts to graphiledemo_visitor;
grant insert(topic_id, body) on app_public.posts to graphiledemo_visitor;
grant update(body) on app_public.posts to graphiledemo_visitor;
grant delete on app_public.posts to graphiledemo_visitor;


create function app_public.random_number() returns int
language sql stable
as $$
  select 4;
$$;

comment on function app_public.random_number()
  is 'Chosen by fair dice roll. Guaranteed to be random. XKCD#221';

create function app_public.forums_about_cats() returns setof app_public.forums
language sql stable
as $$
  select * from app_public.forums where slug like 'cat-%';
$$;
