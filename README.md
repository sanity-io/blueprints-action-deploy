# Sanity Blueprints Deploy Action

This is a GitHub Action that deploys Sanity blueprints using the [@sanity/runtime-cli](https://www.npmjs.com/package/@sanity/runtime-cli).

## How does it work?

When called, the action will:

1. Execute the `blueprints deploy` command with the specified configuration
2. Deploy your Sanity blueprint to the specified project and dataset

This assumes that you have already created a Blueprint config using the `npx sanity blueprint init` and created and mapped your Function.
To see more about how this is done, read up on what [Blueprints](https://www.sanity.io/docs/compute-and-ai/blueprints) are. 

## Basic Usage

Typically, you will want to add this action as a step in your GitHub actions workflow. Here's an example:

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
        uses: actions/checkout@v5
      
      - name: Setup nodejs  
        uses: actions/setup-node@v6
        with:
          node-version: '24'

      - name: Deploy blueprints
        uses: sanity/runtime-actions@v1
        with:
          sanity_token: ${{ secrets.SANITY_AUTH_TOKEN }}
          stack_id: 'ST_1234xyz'
          project_id: '1234xyz'
```

## Inputs

This action has the following configuration options:

| Key | Required | Default | Description                                                     |
|-----|---------|---|-----------------------------------------------------------------|
| `sanity_token` | **Yes** | - | Sanity API token with deploy permissions.                       |
| `stack_id` | **Yes** | - | Blueprint stack ID to interact with                             |
| `organization_id` | No | - | Sanity Organization ID (required if project_id is not provided) |
| `project_id` | No | - | Sanity Project ID (required if project_id is not provided) |

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

## Getting your Blueprints configuration 

In the current repo where you manage your Sanity project run `npx @sanity/runtime-cli blueprints config`
Your output should look similar to:

```shell
Current configuration:
  Sanity Project: <project_id>
  Deployment ID:  <stack_id>
```

Likewise, your `project_id` and `organization_id` can be found in the `.sanity/blueprint.config.json` at the top level of your repo:

```json
{
  "projectId": "<project_id>",
  "blueprintConfigVersion": "",
  "updatedAt": "",
  "organizationId": "<organization_id>"
}
```


## License

MIT License. See the [LICENSE](LICENSE) file for details.
