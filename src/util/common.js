const updateItem = (item, prop) => ({ ...item, ...prop });

const updateData = (data, update) => data.map((item) => item.id === update.id ? update : item);

export { updateItem, updateData };
