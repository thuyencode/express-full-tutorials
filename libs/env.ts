import * as v from '@valibot/valibot'

const NumberSchema = v.pipe(
  v.string(),
  v.nonEmpty(),
  v.transform((input) => Number(input)),
  v.number(),
)

const SecretKeySchema = v.pipe(v.string(), v.minLength(10))

const NonEmptySchema = v.pipe(v.string(), v.nonEmpty())

const UrlSchema = v.pipe(v.string(), v.url())

const EnvSchema = v.object({
  PORT: NumberSchema,
  COOKIE_SECRET_KEY: SecretKeySchema,
  SESSION_SECRET_KEY: SecretKeySchema,
  MONGODB_HOST: NonEmptySchema,
  MONGODB_PORT: NumberSchema,
  MONGODB_DB_NAME: NonEmptySchema,
  MONGODB_SESSION_COLLECTION_NAME: NonEmptySchema,
  MONGODB_CONNECTION_URI: v.pipe(UrlSchema, v.startsWith('mongodb')),
  DISCORD_CLIENT_ID: NonEmptySchema,
  DISCORD_CLIENT_SECRET: SecretKeySchema,
  DISCORD_REDIRECT_URL: v.pipe(UrlSchema, v.startsWith('http')),
  TEST: v.optional(v.string()),
})

const env = v.parse(EnvSchema, Deno.env.toObject())

export default env
