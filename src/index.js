const core = require('@actions/core')
const exec = require('@actions/exec')

/**
 * Main function to run the blueprints deploy.
 * @returns {Promise<void>}
 */
async function run() {
  try {
    const sanityToken = core.getInput('sanity_token', {required: true})
    const stackId = core.getInput('stack_id', {required: true})
    const orgId = core.getInput('organization_id')
    const projectId = core.getInput('project_id')

    if (!orgId && !projectId) {
      // if we don't have orgId or projectId, fail the action. At least one is needed for the CLI to run deploy
      core.setFailed('‼️Missing either a `project_id` or an `organization_id`.')
      return
    }

    core.exportVariable('SANITY_AUTH_TOKEN', sanityToken)
    core.exportVariable('SANITY_BLUEPRINT_STACK_ID', stackId)
    // There are specifics to how the CLI interprets these variables.
    // Set out all them if provided and let the CLI sort out proper precedence.
    if (orgId) core.exportVariable('SANITY_ORGANIZATION_ID', orgId)
    if (projectId) core.exportVariable('SANITY_PROJECT_ID', projectId)

    core.info('Starting Sanity blueprints deployment...')

    const args = ['blueprints', 'deploy']
    core.info(`Running: sanity ${args.join(' ')}`)

    await exec.exec('npx', ['@sanity/runtime-cli', ...args])

    core.info('✅ Blueprints deployed successfully!')
  } catch (error) {
    core.setFailed(`‼️Action failed: ${error.message}`)
  }
}

run()
