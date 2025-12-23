# Plan Action

## Description
A GitHub Action that analyzes and displays the changes that would be applied to your Sanity Blueprints on the next deployment. It provides a detailed plan of resources to be created, updated, or deleted, helping you review changes before applying them.

## Inputs
See the [main documentation](../README.md#inputs) for all available inputs.

## Setup
For initial setup and configuration, see the [main README](../README.md#setup).

## Usage

Add this action to your GitHub Actions workflow file (e.g., `.github/workflows/blueprint-plan.yml`):

### Permissions

This action requires the `pull-requests: write` permission to post comments on PRs:

```yaml
permissions:
  contents: read
  pull-requests: write
```

```yaml
name: Sanity Blueprints Plan

on:
  pull_request:

jobs:
  plan:
    runs-on: ubuntu-latest
    steps:
      - name: Plan blueprints changes
        uses: sanity-io/blueprints-actions/plan@v1
        with:
          sanity-token: ${{ secrets.SANITY_TOKEN }}
          stack-id: 'ST_1234xyz'
          project-id: '1234xyz'
```

### Use with an Organization

Alternatively, run with an organization instead of a specific project:

```yaml
- name: Plan blueprints changes
  uses: sanity-io/blueprints-actions/plan@v1
  with:
    sanity-token: ${{ secrets.SANITY_TOKEN }}
    stack-id: 'ST_1234xyz'
    organization-id: 'abc123'
```

If you have your blueprint files in a specific directory, specify the `working-directory` input:

```yaml
- name: Plan blueprints
  uses: sanity-io/blueprints-actions/plan@v1
  with:
    sanity-token: ${{ secrets.SANITY_TOKEN }}
    stack-id: 'ST_1234xyz'
    project-id: '1234xyz'
    working-directory: './dir/to/blueprint/files'
```

### Output
When you run this action, you'll see output similar to:

```
Analyzing blueprint changes...

Resources to be created:
  + access.group: content-editors
  + function: process-webhook
  + webhook: content-sync

Resources to be updated:
  ~ cors.origin: https://app.example.com
    - allowCredentials: false → true

Resources to be deleted:
  - dataset: old-test-data

Summary: 3 to create, 1 to update, 1 to delete
```

This action provides a clear overview of the changes that will be applied during the next deployment of your Sanity Blueprints via a PR comment.

```
## Sanity Blueprints Deployment Plan

<details>
  <summary>View planned changes</summary>
  
  [Output from sanity blueprints plan command will appear here]
  
</details>
```


