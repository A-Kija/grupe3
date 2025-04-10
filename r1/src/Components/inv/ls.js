import { v4 } from 'uuid';

const getLS = key => {
    const lsData = localStorage.getItem(key);
    if (null === lsData) {
        localStorage.setItem(key, JSON.stringify([]));
        return [];
    }
    return JSON.parse(lsData);
}

const setLS = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

// CRUD store-read-update-destroy

export const store = (key, data) => {
    const id = v4();
    const lsData = getLS(key);
    lsData.push({ ...data, id });
    setLS(key, lsData);
}

export const read = key => {
    return getLS(key);
}

export const update = (key, data, id) => {
    let lsData = getLS(key);
    lsData = lsData.map(d => d.id === id ? { ...d, ...data, id } : d);
    setLS(key, lsData);
}

export const destroy = (key, id) => {
    let lsData = getLS(key);
    lsData = lsData.filter(d => d.id !== id);
    setLS(key, lsData);
}