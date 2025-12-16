import {defineBlueprint, defineDocumentFunction} from '@sanity/blueprints'

export default defineBlueprint({
    blueprintVersion: '2025-10-31',
    resources: [
        defineDocumentFunction({
            name: 'integration-plan-test-function',
            type: 'sanity.function.document',
            event: {
                on: ["create", "update"],
                filter: "_type == 'post'",
                projection: "{title, body}",
                resource: {
                    type: 'dataset',
                    id: `${process.env.SANITY_PROJECT_ID}.*`
                }
            }
        }),
    ],
})