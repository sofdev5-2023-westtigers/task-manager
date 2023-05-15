//src/components/__tests/example.test.js
import { test, expect } from "vitest";

function sum(a, b) {
    return a + b;
}

test("add 2 numbers", () => {
    expect(sum(2,3)).toEqual(5);
});

test("add up numbers", () => {
    expect(sum(2,8)).toEqual(10);
});