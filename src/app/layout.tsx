import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kor">
      <head>
        <meta charSet='utf-8' />
        <meta httpEquiv='u-ea-compatible' content='IE=edge' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </head>
      <body>
        <div id='_next'>
          {children}
        </div>
      </body>
    </html>
  )
}
