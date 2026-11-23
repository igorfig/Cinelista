type OmitUndefined<T> = {
    [K in keyof T]: Exclude<T[K], undefined>;
};

export function omitUndefined<T extends object>(value: T): OmitUndefined<T> {
    const entries = Object.entries(value).filter(([, item]) => item !== undefined);

    return Object.fromEntries(entries) as OmitUndefined<T>;
}
