export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm opacity-70">
          &copy; {new Date().getFullYear()} TestProject. Design Generator v2.
        </p>
      </div>
    </footer>
  )
}
