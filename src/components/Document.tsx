export const Document = () => {
  return (
    <html>
      <body>
        <div id='app'></div>
      </body>
      <ClientScript devMode = {import.meta.env?.DEV} />
    </html>
  )
}

const ClientScript = ({ devMode }: { devMode?: boolean }) => {
  const scriptPath = devMode ? '/src/client.tsx' : '/static/client.js'
  return <script type='module' src={scriptPath}></script>
}
