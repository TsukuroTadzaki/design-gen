import { createContext, useContext, forwardRef } from 'react'
import { Link as RouterLink, useLocation, type LinkProps } from 'react-router-dom'

const ProjectBaseContext = createContext('')

export function ProjectBaseProvider({ projectId, children }: { projectId: string, children: React.ReactNode }) {
  return (
    <ProjectBaseContext.Provider value={`/project/${projectId}`}>
      {children}
    </ProjectBaseContext.Provider>
  )
}

export function useProjectBase() {
  return useContext(ProjectBaseContext)
}

/**
 * Project-aware Link that automatically prefixes paths with /project/{id}
 * so generated components can use simple paths like "/menu"
 */
export const ProjectLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ to, ...props }, ref) => {
    const base = useContext(ProjectBaseContext)
    const resolvedTo = typeof to === 'string' && to.startsWith('/')
      ? to === '/' ? base : base + to
      : to
    return <RouterLink ref={ref} to={resolvedTo} {...props} />
  }
)
ProjectLink.displayName = 'ProjectLink'

/**
 * Project-aware useLocation that strips the /project/{id} prefix
 * so isActive checks work with simple paths like "/menu"
 */
export function useProjectLocation() {
  const location = useLocation()
  const base = useContext(ProjectBaseContext)
  const pathname = location.pathname.startsWith(base)
    ? location.pathname.slice(base.length) || '/'
    : location.pathname
  return { ...location, pathname }
}
