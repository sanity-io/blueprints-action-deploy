const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    // Get inputs
    const sanityToken = core.getInput('sanity_token', { required: true });
    const projectId = core.getInput('project_id');
    const dataset = core.getInput('dataset');
    const blueprintPath = core.getInput('blueprint_path');

    core.info('Starting Sanity blueprints deployment...');

    // Set Sanity token as environment variable
    core.exportVariable('SANITY_AUTH_TOKEN', sanityToken);

    // Build the command arguments
    const args = ['blueprints', 'deploy'];

    // support for organization-level blueprints can be added here in the future
    if (projectId) {
      args.push('--project', projectId);
    }

    if (dataset) {
      args.push('--dataset', dataset);
    }

    // @todo: support for --config flag could be added.
    if (blueprintPath && blueprintPath !== '.') {
      args.push('--path', blueprintPath);
    }

    core.info(`Running: sanity ${args.join(' ')}`);
    await exec.exec('npx', ['@sanity/runtime-cli', ...args]);

    core.info('✅ Blueprints deployed successfully!');
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
