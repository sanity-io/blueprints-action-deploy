// Media library asset event handler
// Note: Using generic handler structure as mediaLibraryEventHandler may not be available in current @sanity/functions version
export const handler = async ({ context, event }: any) => {
    const time = new Date().toLocaleTimeString()
    console.log(`📸 Media Library Function called at ${time}`)
    console.log(`Asset ID: ${event.data._id}`)
    console.log(`MIME Type: ${event.data.mimeType}`)
    console.log(`Size: ${event.data.size} bytes`)
}
