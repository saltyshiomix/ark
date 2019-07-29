-- Drop

drop schema if exists app_public cascade;
drop schema if exists app_private cascade;
drop schema if exists app_jobs cascade;

drop role if exists portal, portal_anonym, portal_user;
