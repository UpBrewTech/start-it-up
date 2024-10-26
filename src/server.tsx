import { Hono } from 'hono'
import { Document } from './components/Document'
import { validator } from 'hono/validator'
import { z } from 'zod'
import { parse } from 'hono/utils/cookie'

type Env = {
  Bindings: {
    /* custom variables */
  }
}

const app = new Hono<Env>()

app.get('/', (c) => {
  return c.html(<Document />)
})

const greetInput = z.object({
  name: z.string()
})

const greeter = app.post(
  '/hello', 
  validator('json', (value, c) => {
    const parsed = greetInput.safeParse(value)
    if (!parsed.success) return c.text('Ugh') 
    return parsed.data
  }),
  async (c) => {
    const { name } = c.req.valid('json')
    return c.json({ message: `Hello ${name}` }, 200)
  }
)

export default app
export type Greeting = typeof greeter
