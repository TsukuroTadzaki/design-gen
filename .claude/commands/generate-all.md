Run the generation orchestrator for project: $ARGUMENTS

Execute:
```bash
chmod +x scripts/generate.sh
./scripts/generate.sh $ARGUMENTS
```

This will generate all sections, compose pages, and create project.config.ts.
Each section is generated in an isolated claude -p call with clean context.
Already existing files are skipped.

After completion, open the browser to preview: /project/$ARGUMENTS