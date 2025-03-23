
export default function Footer() {
  return (
    <footer className="w-full h-10 bg-background-secondary flex items-center justify-center">
      <p className="text-sm text-text-muted">
        &copy; {new Date().getFullYear()} RF Check. All rights reserved.
      </p>
    </footer>
  )
}
