export function trimResponseBody(body: string, maxBodyLength = 100) {
    return body.length > maxBodyLength
        ? body.slice(0, maxBodyLength) + '... [truncated]'
        : body
}