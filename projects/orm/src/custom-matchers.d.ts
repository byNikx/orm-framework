declare namespace jasmine {
    interface Matchers<T> {
        toBeArray(): boolean;
        toBeNumber(): boolean;
        toBeBoolean(): boolean;
        toBeString(): boolean;
        toBeInstanceOf(type: any): boolean;
    }
}