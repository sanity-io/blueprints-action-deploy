import {
    defineBlueprint,
    defineDocumentFunction,
    defineMediaLibraryAssetFunction,
    defineDocumentWebhook,
    defineDataset,
    defineCorsOrigin,
    defineRole,
} from '@sanity/blueprints'

export default defineBlueprint({
    blueprintVersion: '2025-10-31',
    resources: [
        // Document event function
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
        
        // Media Library Asset function
        defineMediaLibraryAssetFunction({
            name: 'media-library-handler',
            type: 'sanity.function.media-library.asset',
            event: {
                on: ["create", "update"],
                filter: "mimeType match 'image/*'",
                projection: "{_id, mimeType, size}",
                resource: {
                    type: 'media-library',
                    id: process.env.SANITY_PROJECT_ID || 'test'
                }
            }
        }),
        
        // Document webhook
        defineDocumentWebhook({
            name: 'test-webhook',
            url: 'https://webhook.site/test-deploy-action',
            on: ['create', 'update'],
            filter: "_type == 'post'",
            projection: '{title, _id}',
            dataset: 'production',
            apiVersion: '2025-01-01',
            project: process.env.SANITY_PROJECT_ID || 'test',
            httpMethod: 'POST',
            status: 'enabled',
        }),
        
        // Dataset resource
        defineDataset({
            name: 'test-dataset',
            datasetName: 'test-dataset',
            aclMode: 'public',
            project: process.env.SANITY_PROJECT_ID || 'test',
        }),
        
        // CORS origin
        defineCorsOrigin({
            name: 'test-cors',
            origin: 'https://example.com',
            allowCredentials: true,
            project: process.env.SANITY_PROJECT_ID || 'test',
        }),
        
        // Custom role
        defineRole({
            name: 'test-viewer',
            title: 'Test Viewer',
            description: 'A test role for viewing content',
            appliesToUsers: true,
            appliesToRobots: false,
            permissions: [
                {
                    name: 'read',
                    action: 'read',
                },
            ],
        }),
    ],
})
