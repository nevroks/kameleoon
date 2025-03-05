const deleteUrls = (text: string) => text.replace(/\b(?:https?:\/\/)?(?:www\.)?([^\s/$.?#].[^\s]*)/g, '$1');

export { deleteUrls };