const core = require('@actions/core')
const exec = require('@actions/exec')

// The runtime cli assumes the blueprints file is in the root and available.
// A file path could be input if users need to define where their blueprints file is located, and then probably set the working directory too.

// For now, this action will just run `runtime-cli blueprints deploy`
// What other options we might want to expose here or could be useful for users?

/**
 * Main function to run the blueprints deploy.
 * @returns {Promise<void>}
 */
async function run() {
  try {
    // I guess if we get from the ENV, we could skip the input requirement and document that it should be set as `SANITY_AUTH_TOKEN` in GHA env?
    const sanityToken = core.getInput('sanity_token')
    const orgId = core.getInput('organization_id')
    const projectId = core.getInput('project_id')
    const stackId = core.getInput('stack_id', {required: true})

    if (!sanityToken || !process.env.SANITY_AUTH_TOKEN) {
      // If we don't have a token, fail the action
      core.setFailed('Action failed: Missing a valid `sanity_token`.')
    }

    if (!orgId && !projectId) {
      // if we don't have orgId or projectId, fail the action. At least one is needed for the CLI to run deploy
      core.setFailed('Action failed: Missing either a `project_id` or an `organization_id`.')
    }

    if (!process.env.SANITY_AUTH_TOKEN) {
      // Set the SANITY_AUTH_TOKEN env var for the CLI to use
      core.exportVariable('SANITY_AUTH_TOKEN', sanityToken)
    }

    // There are specifics to how the CLI interprets these variables. We can set them all. Set all three and let the CLI sort it out.
    core.exportVariable('SANITY_ORGANIZATION_ID', orgId)
    core.exportVariable('SANITY_PROJECT_ID', projectId)
    core.exportVariable('SANITY_BLUEPRINT_STACK_ID', stackId)

    core.info('Starting Sanity blueprints deployment...')

    const args = ['blueprints', 'deploy']

    core.info(`Running: sanity ${args.join(' ')}`)
    await exec.exec('npx', ['@sanity/runtime-cli', ...args])

    core.info('✅ Blueprints deployed successfully!')
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`)
  }
}

run()
