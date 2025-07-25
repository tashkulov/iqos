import type { CapsuleCollection } from "../collectionsData"; // если коллекции имеют ту же структуру

const COLLECTIONS_KEY = "collections";

export const getCollections = (): CapsuleCollection[] => {
    const raw = localStorage.getItem(COLLECTIONS_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const setCollections = (data: CapsuleCollection[]): void => {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(data));
};

export const addCollection = (collection: CapsuleCollection): void => {
    const collections = getCollections();
    setCollections([collection, ...collections]);
};

export const removeCollection = (id: string): void => {
    const collections = getCollections().filter((c: CapsuleCollection) => c.id !== id);
    setCollections(collections);
};

export const updateCollection = (updated: CapsuleCollection): void => {
    const collections = getCollections().map((c: CapsuleCollection) =>
        c.id === updated.id ? { ...c, ...updated } : c
    );
    setCollections(collections);
};
