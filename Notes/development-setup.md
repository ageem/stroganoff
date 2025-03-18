# Development Setup Notes

## Branches
- **Main Branch**: Production branch
  - GitHub: https://github.com/ageem/stroganoff/tree/main
  - Deployment: https://stroganoff.vercel.app/

- **Development Branch**: Testing and development
  - GitHub: https://github.com/ageem/stroganoff/tree/development
  - Preview: https://stroganoff-git-development-mike-agees-projects.vercel.app/

## Development Workflow
1. Always make changes in the `development` branch first
2. Test changes in the development preview URL
3. Once verified, create a pull request to merge into `main`

## Commands
```bash
# Switch to development branch
git checkout development

# Create a new feature branch from development
git checkout -b feature/your-feature-name

# Push changes to development
git push origin development
```

## Important URLs
- Production: https://stroganoff.vercel.app/
- Development Preview: https://stroganoff-git-development-mike-agees-projects.vercel.app/
- GitHub Repository: https://github.com/ageem/stroganoff

## Notes
- Vercel automatically creates preview deployments for each branch
- The development branch can be used to safely test changes without affecting the production site
- Always verify changes in the development preview before merging to main 