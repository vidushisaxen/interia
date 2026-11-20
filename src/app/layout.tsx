// Built using Hyperiux Vault: https://vault.hyperiux.com

const RESTORATION_RESET = "try{if(!location.hash)history.scrollRestoration='manual'}catch(e){}";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: RESTORATION_RESET }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
