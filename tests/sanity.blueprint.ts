import {
    defineBlueprint,
    defineDocumentFunction,
    defineDocumentWebhook,
    defineDataset,
    defineCorsOrigin,
    defineRole,
} from '@sanity/blueprints'

export default defineBlueprint({
    blueprintVersion: '2025-10-31',

    resources: [
        defineDocumentFunction({
            name: 'integration-test',
            type: 'sanity.function.document',
            event: {
                on: ["create", "update"],
                filter: "_type == 'post'",
                projection: "{title, _id, _type}",
                resource: {
                    type: 'dataset',
                    id: `${process.env.SANITY_PROJECT_ID}.*`
                }
            }
        }),
        defineDocumentWebhook({
            name: 'test-webhook',
            url: 'https://webhook.site/test-deploy-action',
            on: ['create', 'update'],
            filter: "_type == 'post'",
            projection: '{title, _id}',
            dataset: 'production',
            apiVersion: 'vX',
            project: process.env.SANITY_PROJECT_ID,
            httpMethod: 'POST',
            status: 'enabled',
        }),
        defineDataset({
            name: 'test-dataset',
            datasetName: 'test-dataset',
            aclMode: 'public',
            project: process.env.SANITY_PROJECT_ID,
        }),
        defineCorsOrigin({
            name: 'test-cors',
            origin: 'https://example.com',
            allowCredentials: true,
            project: process.env.SANITY_PROJECT_ID,
        }),
        defineRole({
            name: 'custom-role',
            title: 'Custom Role',
            description: 'A test role',
            appliesToUsers: true,
            appliesToRobots: false,
            permissions: [
                {
                    name: 'sanity-all-documents',
                    action: "mode",
                    params: {
                        mode: "publish",
                        history: true
                    }
                },
            ],
        }),
    ],
})
