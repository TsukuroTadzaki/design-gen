import { Link } from 'react-router-dom'
import { getProjects } from '@/core/lib/projects'

export function ProjectSelector() {
  const projects = getProjects()

  return (
    <div className="min-h-screen bg-muted flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Design Generator v2
        </h1>
        <p className="text-muted-foreground text-lg">
          Select a project to preview
        </p>
      </div>

      {projects.length === 0 ? (
        <div className="text-center text-muted-foreground">
          <p className="text-lg mb-2">No projects generated yet</p>
          <p className="text-sm">
            Run <code className="bg-background px-2 py-1 rounded">/generate-styles {'<project-id>'}</code> to start generating a project
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl w-full">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              className="block bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold text-foreground mb-2">
                {project.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {project.routes.length} pages
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
