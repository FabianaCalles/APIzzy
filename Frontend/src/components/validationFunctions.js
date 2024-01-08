export function isValidField(value, regex) {
    return regex.test(value);
}

export function isNotEmpty(value) {
    return value.trim() !== '';
}
