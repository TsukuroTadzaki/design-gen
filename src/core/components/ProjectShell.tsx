import { useEffect, type ReactNode } from 'react'
import type { ProjectConfig } from '@/core/lib/projects'
import { ProjectBaseProvider } from '@/core/lib/project-context'

interface ProjectShellProps {
  projectId: string
  config: ProjectConfig
  children: ReactNode
}

export function ProjectShell({ projectId, config, children }: ProjectShellProps) {
  useEffect(() => {
    document.documentElement.setAttribute('data-project', projectId)
    return () => {
      document.documentElement.removeAttribute('data-project')
    }
  }, [projectId])

  useEffect(() => {
    if (config.styles) {
      const style = document.createElement('style')
      style.setAttribute('data-project-styles', projectId)
      style.textContent = config.styles
      document.head.appendChild(style)
      return () => {
        document.head.removeChild(style)
      }
    }
  }, [projectId, config.styles])

  const Header = config.Header
  const Footer = config.Footer

  return (
    <ProjectBaseProvider projectId={projectId}>
      <Header />
      <main>{children}</main>
      <Footer />
    </ProjectBaseProvider>
  )
}
