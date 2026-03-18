import { Button } from '@/core/ui/Button'
import { ProjectLink as Link } from '@/core/lib/project-context'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold text-foreground">TestProject</Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
        </nav>
        <Button variant="accent" size="sm">Contact</Button>
      </div>
    </header>
  )
}
