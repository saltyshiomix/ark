-- First, we clean out the old stuff

drop schema if exists app_public cascade;
drop schema if exists app_hidden cascade;
drop schema if exists app_private cascade;
drop schema if exists app_jobs cascade;

--------------------------------------------------------------------------------

-- Definitions <500 are common to all sorts of applications,
-- they solve common concerns such as storing user data,
-- logging people in, triggering password reset emails,
-- mitigating brute force attacks and more.

-- Background worker tasks
\ir 100_jobs.sql

-- app_public, app_private and base permissions
\ir 200_schemas.sql

-- Useful utility functions
\ir 300_utils.sql

-- Users, authentication, emails, etc
\ir 400_users.sql

--------------------------------------------------------------------------------

-- Definitions >=500 are application specific, defining the tables
-- in your application, and dealing with concerns such as a welcome
-- email or customising the user tables to your whim

-- Forum tables
\ir 700_forum.sql

\ir 999_data.sql
