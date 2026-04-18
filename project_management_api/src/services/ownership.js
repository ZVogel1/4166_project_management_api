export function assertOwnership(resource, currentUserId, ownerField, resourceName) {
    if (!resource) {
        const notFoundError = new Error(`${resourceName} not found`);
        notFoundError.status = 404;
        throw notFoundError;
    }

    if (resource[ownerField] !== currentUserId) {
        const forbiddenError = new Error(
            `${resourceName} can only be modified by its owner`
        );
        forbiddenError.status = 403;
        throw forbiddenError;
    }
}