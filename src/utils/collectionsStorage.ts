// collectionsStorage.ts
const COLLECTIONS_KEY = "collections";

export const getCollections = () => {
    const raw = localStorage.getItem(COLLECTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const setCollections = (data) => {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(data));
};

export const addCollection = (collection) => {
    const collections = getCollections();
    setCollections([collection, ...collections]);
};

export const removeCollection = (id) => {
    const collections = getCollections().filter(c => c.id !== id);
    setCollections(collections);
};

export const updateCollection = (updated) => {
    const collections = getCollections().map(c =>
        c.id === updated.id ? { ...c, ...updated } : c
    );
    setCollections(collections);
};
