import type { CapsuleCollection } from "../collectionsData.ts";

const STORAGE_KEY = "capsules";

export const getCapsules = (): CapsuleCollection[] => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) as CapsuleCollection[] : [];
};

export const setCapsules = (data: CapsuleCollection[]): void => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const addCapsule = (capsule: CapsuleCollection): void => {
    const capsules = getCapsules();
    setCapsules([capsule, ...capsules]);
};

export const removeCapsule = (id: string): void => {
    const capsules = getCapsules().filter((c: CapsuleCollection) => c.id !== id);
    setCapsules(capsules);
};

export const updateCapsule = (updatedCapsule: CapsuleCollection): void => {
    const capsules = getCapsules().map((c: CapsuleCollection) =>
        c.id === updatedCapsule.id ? updatedCapsule : c
    );
    setCapsules(capsules);
};
