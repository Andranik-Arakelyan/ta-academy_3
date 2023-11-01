export function generateRandomEmail(): string {
    const randomString = Math.random().toString(36).substring(7);
    const domain = 'test.com';

    return `${randomString}@${domain}`;
}
