# Sanity Blueprints Deploy Action

This is a GitHub Action that deploys Sanity blueprints using the [@sanity/runtime-cli](https://www.npmjs.com/package/@sanity/runtime-cli).

## How does it work?

When called, the action will:

1. Set up the Sanity authentication token
2. Execute the `blueprints deploy` command with the specified configuration
3. Deploy your Sanity blueprint to the specified project and dataset

## Usage

Typically, you will want to add this action as a step in your deployment workflow. Here's an example:

```yaml
name: Deploy Sanity Blueprints

on:
  push:
    branches:
      - main
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3
      
      - name: Deploy blueprints
        uses: sanity/runtime-actions@v1
        with:
          sanity_token: ${{ secrets.SANITY_AUTH_TOKEN }}
```

## Inputs

This action has the following configuration options:

| Key | Required | Default   | Description |
|-----|---------|-----------|-------------|
| `sanity_token` | No      | -         | Sanity API token with deploy permissions |

## Examples

### Basic deployment

```yaml
- name: Deploy blueprints
  uses: sanity/runtime-actions@v1
  with:
    sanity_token: ${{ secrets.SANITY_AUTH_TOKEN }}
```

### Deployment with specific project and dataset

```yaml
- name: Deploy to staging
  uses: sanity/runtime-actions@v1
  with:
    sanity_token: ${{ secrets.SANITY_AUTH_TOKEN }}
```

## Setting up secrets

1. Go to your GitHub repository settings
2. Navigate to **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add `SANITY_AUTH_TOKEN` with your Sanity API token

To create a Sanity API token:
1. Go to [manage.sanity.io](https://manage.sanity.io)
2. Select your project
3. Go to **API** → **Tokens**
4. Create a token with appropriate deploy permissions

## License

MIT License. See the [LICENSE](LICENSE) file for details.
