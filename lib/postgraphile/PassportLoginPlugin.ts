/** @format */

// #region Imports NPM
const { makeExtendSchemaPlugin, gql } = require('graphile-utils');
// #endregion

// TODO: passport docs
export const PassportLoginPlugin = makeExtendSchemaPlugin((build: any) => ({
  typeDefs: gql`
    input RegisterInput {
      username: String!
      email: String!
      password: String!
      name: String
      avatarUrl: String
    }

    type RegisterPayload {
      user: User! @pgField
    }

    input LoginInput {
      username: String!
      password: String!
    }

    type LoginPayload {
      user: User! @pgField
    }

    extend type Mutation {
      register(input: RegisterInput!): RegisterPayload
      login(input: LoginInput!): LoginPayload
    }
  `,
  resolvers: {
    Mutation: {
      async register(
        mutation: any,
        args: any,
        context: any,
        resolveInfo: any,
        { selectGraphQLResultFromTable }: any,
      ) {
        const { username, password, email, name, avatarUrl } = args.input;
        const { rootPgPool, login, pgClient } = context;

        // eslint-disable-next-line no-debugger
        debugger;

        try {
          // Call our login function to find out if the username/password combination exists
          const {
            rows: [user],
          } = await rootPgPool.query(
            `select users.* from app_private.really_create_user(
              username => $1,
              email => $2,
              email_is_verified => false,
              name => $3,
              avatar_url => $4,
              password => $5
            ) users where not (users is null)`,
            [username, email, name, avatarUrl, password],
          );

          if (!user) {
            throw new Error('Registration failed');
          }

          // Tell Passport.js we're logged in
          await login(user);

          // Tell pg we're logged in
          await pgClient.query('select set_config($1, $2, true);', [
            'jwt.claims.user_id',
            user.id,
          ]);

          // Fetch the data that was requested from GraphQL, and return it
          const sql = build.pgSql;
          const [row] = await selectGraphQLResultFromTable(
            sql.fragment`app_public.users`,
            (tableAlias: any, sqlBuilder: any) => {
              sqlBuilder.where(
                sql.fragment`${tableAlias}.id = ${sql.value(user.id)}`,
              );
            },
          );

          return {
            data: row,
          };
        } catch (error) {
          console.error(error);
          // TODO: check that this is indeed why it failed
          throw new Error('Login failed: incorrect username/password');
        }
      },

      /**
       * Mutation: Login
       *
       * @param mutation -
       * @param args - Input parameters
       * @param context - Additional context
       * @param resolveInfo -
       * @param param4 -
       */
      async login(
        mutation: any,
        args: any,
        context: any,
        resolveInfo: any,
        { selectGraphQLResultFromTable }: any,
      ) {
        const { username, password } = args.input;
        const { rootPgPool, login, pgClient } = context;

        try {
          // Call our login function to find out if the username/password combination exists
          const {
            rows: [user],
          } = await rootPgPool.query(
            'select users.* from app_private.login($1, $2) users where not (users is null)',
            [username, password],
          );

          if (!user) {
            throw new Error('Login failed');
          }

          // Tell Passport.js we're logged in
          await login(user);

          // eslint-disable-next-line no-debugger
          debugger;

          // Tell pg we're logged in
          await pgClient.query('select set_config($1, $2, true);', [
            'jwt.claims.user_id',
            user.id,
          ]);

          // Fetch the data that was requested from GraphQL, and return it
          const sql = build.pgSql;
          const [row] = await selectGraphQLResultFromTable(
            sql.fragment`app_public.users`,
            (tableAlias: any, sqlBuilder: any) => {
              sqlBuilder.where(
                sql.fragment`${tableAlias}.id = ${sql.value(user.id)}`,
              );
            },
          );

          return {
            data: row,
          };
        } catch (error) {
          console.error(error);
          // TODO: check that this is indeed why it failed
          throw new Error('Login failed: incorrect username/password');
        }
      },
    },
  },
}));
