import { createBrowserRouter, RouterProvider, useParams, Navigate } from 'react-router-dom'
import { ProjectSelector } from '@/core/components/ProjectSelector'
import { ProjectShell } from '@/core/components/ProjectShell'
import { getProject, getProjects } from '@/core/lib/projects'

function ProjectRoute() {
  const { id, '*': splat } = useParams()
  const project = id ? getProject(id) : undefined

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Project not found</h1>
          <p className="text-muted-foreground">Project "{id}" does not exist or has not been generated yet.</p>
        </div>
      </div>
    )
  }

  // Find route matching the current splat path
  const currentPath = '/' + (splat || '')
  const matchedRoute = project.routes.find(r => r.path === currentPath)
    || project.routes.find(r => r.path === '/')

  if (!matchedRoute) {
    return <Navigate to={`/project/${id}`} replace />
  }

  const PageComponent = matchedRoute.component

  return (
    <ProjectShell projectId={project.id} config={project}>
      <PageComponent />
    </ProjectShell>
  )
}

const router = createBrowserRouter([
  { path: '/', element: <ProjectSelector /> },
  { path: '/project/:id/*', element: <ProjectRoute /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
