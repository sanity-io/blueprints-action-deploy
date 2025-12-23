# Internal Testing Documentation

This document outlines the testing strategy and workflows for the Sanity Blueprints Deploy Action.

## Overview

The action is tested through four automated GitHub Actions workflows that validate different aspects of the deployment process:

1. **Action Schema Validation** (`.github/workflows/lint.yml`)
2. **Integration Testing** (`.github/workflows/test.yml`)
3. **Manual Staging Testing** (`.github/workflows/stage.yml`)
4. **Daily Automated Testing** (`.github/workflows/daily-test.yml`)

All tests run against the staging environment (`sanity.work`).

---

## Test Workflows

### 1. Action Schema Validation (`lint.yml`)

**Trigger:** Pull requests

**Purpose:** Validates that the `action.yml` file conforms to GitHub Actions schema standards.

**Process:**
- Installs schema validation tools
- Downloads the official GitHub Actions schema from SchemaStore
- Validates `action.yml` against the schema with error reporting

**What it tests:**
- Action metadata is correctly structured
- All required fields are present
- Input/output definitions are valid

**Success criteria:** No errors found in the action.yml file

---

### 2. Integration Testing (`test.yml`)

**Trigger:** Pull requests

**Purpose:** Runs a full integration test of the deploy action against the staging environment.

**Environment:**
- `SANITY_INTERNAL_ENV: 'staging'` - Routes all calls to `sanity.work`

**Process:**
1. Sets up Node.js 24
2. Installs test dependencies from `./tests` directory
3. Executes the action with staging credentials
4. Deploys a test blueprint to verify end-to-end functionality

**What it tests:**
- Action can be invoked successfully
- Blueprint deployment succeeds in staging environment
- All required inputs are properly processed

**Secrets required:**
- `SANITY_TOKEN` - Staging API token with deploy permissions
- `STACK_ID` - Test blueprint stack ID
- `PROJECT_ID` - Test project ID
- `ORGANIZATION_ID` - Test organization ID

**Working directory:** `./tests` (contains test blueprint files)

**Success criteria:** Blueprint deploys successfully to staging without errors

---

### 3. Manual Staging Testing (`stage.yml`)

**Trigger:** Manual workflow dispatch

**Purpose:** Allows manual testing of the CLI action against staging on-demand.

**Environment:**
- `SANITY_INTERNAL_ENV: 'staging'` - Routes all calls to `sanity.work`

**Future enhancement:**
- Environment selection input (staging/production)
- Allows testing against different environments

**Process:**
1. Sets up Node.js 24
2. Installs dependencies from `./tests` directory
3. Deploys blueprint to `sanity.work`
4. Uses same test configuration as integration tests

**What it tests:**
- Manual verification of deployment behavior
- Debugging deployment issues in a controlled environment
- Validation of the runtime-cli before production releases

**Secrets required:**
- `SANITY_TOKEN` - Staging API token
- `STACK_ID` - Test stack ID
- `PROJECT_ID` - Test project ID
- `ORGANIZATION_ID` - Test organization ID

**Success criteria:** Manual verification of successful deployment

---

### 4. Daily Automated Testing (`daily-test.yml`)

**Trigger:** 
- Scheduled cron (daily at 9:00 AM UTC)
- Manual workflow dispatch

**Purpose:** Provides continuous validation of the CLI action against staging to catch regressions early.

**Environment:**
- `SANITY_INTERNAL_ENV: 'staging'` - Routes all calls to `sanity.work`

**What it tests:**
- Continuous verification of cli functionality
- Validates current resource types: functions, webhooks, datasets, CORS, roles

**Secrets required:**
- `SANITY_TOKEN` - Staging API token
- `STACK_ID` - Test stack ID
- `PROJECT_ID` - Test project ID
- `ORGANIZATION_ID` - Test organization ID
- `SLACK_WEBHOOK_URL` - Slack webhook for notifications

---

## Test Environment Setup

### Test Directory Structure

```
tests/
├── functions/
│   ├── integration-test/          # Document event function
│   └── media-library-handler/    # Media library asset function
└── sanity.blueprint.ts            # Test blueprint with all resource types
```

### Test Resources

The test blueprint (`sanity.blueprint.ts`) includes comprehensive examples of all supported resource types:

- **Document Functions**: Event handlers for document create/update/delete
- **Media Library Functions**: Handlers for media library asset events
- **Webhooks**: Document webhooks for external notifications
- **Datasets**: Dataset resource definitions
- **CORS Origins**: CORS configuration
- **Roles**: Custom access control roles

### Required Secrets

All workflows require the following GitHub repository secrets to be configured:

| Secret | Description | Environment |
|--------|-------------|-------------|
| `SANITY_TOKEN` | API token with deploy permissions | Staging (`sanity.work`) |
| `STACK_ID` | Blueprint stack identifier (e.g., `ST_1234xyz`) | Staging |
| `PROJECT_ID` | Test project identifier | Staging |
| `ORGANIZATION_ID` | Test organization identifier | Staging |

### Staging Environment

All automated tests use the staging environment by setting:
```yaml
env:
  SANITY_INTERNAL_ENV: 'staging'
```
---

## Running Tests

### Automated Tests

**Schema validation and integration tests run automatically on every pull request.**

1. Create a pull request
2. Both `lint.yml` and `test.yml` workflows execute automatically
3. Review workflow results in the PR checks section

### Manual Testing

**To run manual staging tests:**

1. Navigate to **Actions** tab in GitHub repository
2. Select **Manual Blueprint Deployment Action** workflow
3. Click **Run workflow**
4. Select branch to test
5. Click **Run workflow** button
6. Monitor execution in Actions tab