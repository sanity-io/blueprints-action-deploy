const core = require('@actions/core');
const exec = require('@actions/exec');

// In the runtime cli it assumes the blueprints file is in the root and available.
// Can the runtime cli take a path to the blueprints file? If so we can make that an input here too.
// A file path could be input if users need to define where their blueprints file is located, and then probably set the working directory too.

// For now, this action will just run `runtime-cli blueprints deploy`
// I wonder what other options we might want to expose here or could be useful for users?

/**
 * Main function to run the GitHub Action.
 * @returns {Promise<void>}
 */
async function run() {
  try {
    // I guess if we get from the ENV, we could skip the input requirement and document that it should be set as `SANITY_AUTH_TOKEN` in GHA env?
    const sanityToken = process.env.SANITY_TOKEN || core.getInput('sanity_token', { required: true });

    if (!sanityToken) {
        // If we don't have a token, fail the action
        core.setFailed('Action failed: Missing the Sanity token. Please provide a valid SANITY_TOKEN as an environment variable or input `sanity_token`.');
    }

    core.info('Starting Sanity blueprints deployment...');
    core.exportVariable('SANITY_AUTH_TOKEN', sanityToken);

    const args = ['blueprints', 'deploy'];

    core.info(`Running: sanity ${args.join(' ')}`);
    await exec.exec('npx', ['@sanity/runtime-cli', ...args]);

    core.info('✅ Blueprints deployed successfully!');
  } catch (error) {
    core.setFailed(`Action failed: ${error.message}`);
  }
}

run();
