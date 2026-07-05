function FacebookIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-2.9h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5v1.8H16l-.4 2.9h-2.2v7A10 10 0 0 0 22 12z" />
    </svg>
  )
}

function LinkedinIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM3.5 8.5h3.9V21H3.5zM10 8.5h3.7v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-3.9v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H10z" />
    </svg>
  )
}

function YoutubeIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M23 7.5s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.9 4 12 4 12 4h0s-4.9 0-7.8.2c-.5 0-1.5.1-2.3 1C1.2 5.9 1 7.5 1 7.5S.8 9.4.8 11.2v1.5c0 1.9.2 3.7.2 3.7s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.9 0 7.8-.2c.5-.1 1.5-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.7v-1.5C23.2 9.4 23 7.5 23 7.5zM9.7 14.9V8.9l6 3z" />
    </svg>
  )
}

function WhatsappIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4a7.94 7.94 0 0 0-6.9 11.9L4 20l4.2-1.1a7.9 7.9 0 0 0 3.85 1h0a7.94 7.94 0 0 0 7.94-7.94 7.9 7.9 0 0 0-2.39-5.64zM12.05 18.4h0a6.5 6.5 0 0 1-3.32-.91l-.24-.14-2.5.65.67-2.43-.16-.25a6.55 6.55 0 1 1 12.15-3.46 6.5 6.5 0 0 1-6.6 6.54zm3.6-4.9c-.2-.1-1.17-.58-1.35-.64s-.31-.1-.44.1-.5.64-.61.77-.23.15-.42.05a5.4 5.4 0 0 1-1.6-.99 6 6 0 0 1-1.1-1.37c-.12-.2 0-.31.09-.4s.2-.23.29-.35a1.3 1.3 0 0 0 .2-.33.37.37 0 0 0 0-.35c0-.1-.44-1.06-.6-1.45s-.32-.33-.44-.33h-.38a.72.72 0 0 0-.52.24 2.2 2.2 0 0 0-.68 1.63 3.8 3.8 0 0 0 .8 2.03 8.7 8.7 0 0 0 3.33 2.95c.47.2.83.32 1.12.41a2.7 2.7 0 0 0 1.24.08 2 2 0 0 0 1.32-.93 1.65 1.65 0 0 0 .11-.93c-.05-.09-.18-.14-.38-.24z" />
    </svg>
  )
}

function MessengerIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.15 2 11.26c0 2.9 1.44 5.49 3.7 7.19V22l3.38-1.86c.9.25 1.87.38 2.92.38 5.52 0 10-4.15 10-9.26S17.52 2 12 2zm1.02 12.47-2.55-2.72-4.98 2.72 5.48-5.82 2.62 2.72 4.9-2.72-5.47 5.82z" />
    </svg>
  )
}

export { FacebookIcon, LinkedinIcon, MessengerIcon, WhatsappIcon, YoutubeIcon }
