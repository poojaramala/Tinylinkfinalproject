export const isValidUrl = (value) => {
try {
const u = new URL(value);
return u.protocol === 'http:' || u.protocol === 'https:';
} catch (e) {
return false;
}
};


export const isValidCode = (value) => /^[A-Za-z0-9]{6,8}$/.test(value);