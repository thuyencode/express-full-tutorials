export const MOCKED_USERS = [
  { id: '1', username: 'javascript', name: 'JavaScript', password: 'password' },
  { id: '2', username: 'typescript', name: 'TypeScript', password: 'password' },
  { id: '3', username: 'java', name: 'Java', password: 'password' },
  { id: '4', username: 'rust', name: 'Rust', password: 'password' },
  { id: '5', username: 'zig', name: 'Zig', password: 'password' },
  { id: '6', username: 'gdscript', name: 'GDScript', password: 'password' },
]

export const DATABASE_URL = Deno.env.get('DATABASE_URL') ||
  'mongodb://localhost:27017/express-full-tutorials?directConnection=true'

export const MONGODB_SESSION_COLLECTION_NAME =
  Deno.env.get('MONGODB_SESSION_COLLECTION_NAME') || 'sessions'

export const COOKIE_SECRET_KEY = Deno.env.get('COOKIE_SECRET_KEY') ||
  'Please set a value for "COOKIE_SECRET_KEY" in .env'

export const SESSION_SECRET_KEY = Deno.env.get('SESSION_SECRET_KEY') ||
  'Please set a value for "SESSION_SECRET_KEY" in .env'
