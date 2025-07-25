import type {CapsuleCollection} from "../collectionsData.ts";

const STORAGE_KEY = "capsules";

export const getCapsules = () => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
};

export const setCapsules = (data: CapsuleCollection[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addCapsule = (capsule: CapsuleCollection) => {
    const capsules = getCapsules();
    setCapsules([capsule, ...capsules]);
};

export const removeCapsule = (id: string) => {
    const capsules = getCapsules().filter(c => c.id !== id);
    setCapsules(capsules);
};

export const updateCapsule = (updatedCapsule: CapsuleCollection) => {
    const capsules = getCapsules().map(c =>
        c.id === updatedCapsule.id ? updatedCapsule : c
    );
    setCapsules(capsules);
};
