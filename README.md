# Sanity Blueprints Deploy Action

A GitHub Action for deploying [Sanity Blueprints](https://www.sanity.io/docs/compute-and-ai/blueprints) to production using the [@sanity/runtime-cli](https://www.npmjs.com/package/@sanity/runtime-cli).

## Overview

This action automates the deployment of your Sanity Blueprints by executing the `blueprints deploy` command with your specified configuration. Use it to deploy blueprints automatically on push, pull request merge, or manual workflow triggers.

### Prerequisites

Before using this action, you must:

1. **Initialize a Blueprint** in your Sanity project:
   ```bash
   npx @sanity/runtime-cli blueprints init
   ```

2. **Create and map your Function** according to the [Blueprints documentation](https://www.sanity.io/docs/compute-and-ai/blueprints)

3. **Obtain your Blueprint configuration** (see [Getting Configuration Values](#getting-configuration-values) below)

## Usage

Add this action to your GitHub Actions workflow file (e.g., `.github/workflows/deploy.yml`):

```yaml
name: Deploy Sanity Blueprints

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy blueprints
        uses: sanity-io/blueprints-action-deploy@v1
        with:
          sanity-token: ${{ secrets.SANITY_TOKEN }}
          stack-id: 'ST_1234xyz'
          project-id: '1234xyz'
```

### Deploy to Organization

Alternatively, deploy to an organization instead of a specific project:

```yaml
- name: Deploy blueprints
  uses: sanity-io/blueprints-action-deploy@v1
  with:
    sanity-token: ${{ secrets.SANITY_TOKEN }}
    stack-id: 'ST_1234xyz'
    organization-id: 'abc123'
```

If you have your blueprint files in a specific directory, specify the `working-directory` input:
```yaml

- name: Deploy blueprints
  uses: sanity-io/blueprints-action-deploy@v1
  with:
    sanity-token: ${{ secrets.SANITY_TOKEN }}
    stack-id: 'ST_1234xyz'
    project-id: '1234xyz'
    working-directory: './dir/to/blueprint/files'
```

## Configuration

### Inputs

| Parameter             | Required     | Description                                              |
|-----------------------|--------------|----------------------------------------------------------|
| `sanity-token`        | **Yes**      | Sanity API token with deploy permissions                 |
| `stack-id`            | **Yes**      | Blueprint stack ID (e.g., `ST_1234xyz`)                  |
| `project-id`          | Conditional* | Sanity project ID                                        |
| `organization-id`     | Conditional* | Sanity organization ID                                   |
| `working-directory`   | No           | Path to the directory containing your blueprint files (sanity.blueprint.ts, functions/). Defaults to repository root |

*Either `project-id` **or** `organization-id` must be provided.

### Outputs

| Output | Description |
|--------|-------------|
| `deployment-status` | Status of the deployment |

## Setup

### 1. Create a Sanity API Token

1. Navigate to [manage.sanity.io](https://manage.sanity.io)
2. Select your project or organization
3. Go to **API** → **Tokens**
4. Click **Add API token**
5. Create a token with deploy permissions
6. Copy the token (you won't be able to see it again)

### 2. Add Token to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `SANITY_TOKEN`
5. Value: Paste your Sanity API token
6. Click **Add secret**

### 3. Getting Configuration Values

#### Option 1: Using the CLI

Run this command in your Sanity project directory:

```bash
npx @sanity/runtime-cli blueprints config
```

Output:
```
Current configuration:
  Sanity Project: <project_id>
  Deployment ID:  <stack_id>
```

#### Option 2: From Configuration File

Check `.sanity/blueprint.config.json` in your project root:

```json
{
  "projectId": "<project_id>",
  "organizationId": "<organization_id>",
  "blueprintConfigVersion": "...",
  "updatedAt": "..."
}
```

Use these values in your workflow configuration.

## Resources

- [Sanity Blueprints Documentation](https://www.sanity.io/docs/compute-and-ai/blueprints)
- [@sanity/runtime-cli on npm](https://www.npmjs.com/package/@sanity/runtime-cli)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## Support

For issues and questions:
- Check the [Sanity documentation](https://www.sanity.io/docs)
- Visit the [Sanity community](https://www.sanity.io/community)
- Open an issue in this repository

## Contributing
### Tests
see [TESTING](/docs/testing.md) for details.

## License

MIT License. See [LICENSE](LICENSE) for details.
