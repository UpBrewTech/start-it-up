import { hc } from "hono/client";
import { render, useState } from "hono/jsx/dom";
import { Greeting } from "./server";

const client = hc<Greeting>('/')

const App = () => {
  const [message, setMessage] = useState<string | undefined>(undefined)

  const sayHello = async (event: Event) => {
    // client-side checks
    if (!(event.target instanceof HTMLFormElement)) return
    event.preventDefault()

    // some data sanitation
    const formData = new FormData(event.target)
    const nameInput = formData.get('name')?.toString()
    if (!nameInput) return

    // make api request
    const request = await client.hello.$post({ json: { "name": nameInput } })
    const { message } =  await request.json()
    setMessage(message)
  }
  
  return (
    <div>
      <form onSubmit={sayHello}>
        <input type='text' name='name' defaultValue='' required />
        <button type='submit'>Greet</button>
      </form>
      { message ? <div>{`${message}!`}</div> : null }
    </div>
  )
}

const container = document.getElementById('app')!
render(<App />, container)
