const projectModules = import.meta.glob(
  '../../projects/*/output/project.config.ts',
  { eager: true }
) as Record<string, { default?: ProjectConfig }>

export interface ProjectRoute {
  path: string
  name: string
  component: React.ComponentType
}

export interface ProjectConfig {
  id: string
  name: string
  styles?: string
  Header: React.ComponentType
  Footer: React.ComponentType
  routes: ProjectRoute[]
}

export function getProjects(): ProjectConfig[] {
  return Object.entries(projectModules)
    .filter(([, module]) => module.default != null)
    .map(([path, module]) => {
      const id = path.match(/projects\/(.+?)\/output/)?.[1] ?? ''
      const config = module.default!
      return { ...config, id: config.id || id }
    })
}

export function getProject(id: string): ProjectConfig | undefined {
  return getProjects().find((p) => p.id === id)
}
