import { describe, expect, expectTypeOf, it } from "vitest";

import { sortKeys } from "./sortKeys.ts";

describe(sortKeys, () => {
  it("returns an empty object for an empty object", () => {
    const input = {};

    const actual = sortKeys(input);

    expect(actual).toEqual({});
    expect(actual).not.toBe(input);
  });

  it("sorts keys using localeCompare order", () => {
    const input = {
      zebra: 1,
      apple: 2,
      middle: 3,
    };

    const actual = sortKeys(input);

    expect(Object.keys(actual)).toEqual(["apple", "middle", "zebra"]);
    expect(actual).toEqual({
      apple: 2,
      middle: 3,
      zebra: 1,
    });
  });

  it("leaves already sorted keys unchanged", () => {
    const input = {
      alpha: "a",
      beta: "b",
      gamma: "g",
    };

    const actual = sortKeys(input);

    expect(actual).toEqual(input);
  });

  it("does not mutate the input object", () => {
    const input = {
      z: 1,
      a: 2,
    };
    const originalKeys = Object.keys(input);

    sortKeys(input);

    expect(Object.keys(input)).toEqual(originalKeys);
    expect(input).toEqual({ z: 1, a: 2 });
  });

  it("preserves values, including undefined and object references", () => {
    const nested = { value: 1 };
    const callback = () => "result";
    const input = {
      callback,
      nested,
      missing: undefined,
    };

    const actual = sortKeys(input);

    expect(actual).toEqual({ callback, missing: undefined, nested });
    expect(actual.callback).toBe(callback);
    expect(actual.nested).toBe(nested);
  });

  it("preserves input type", () => {
    const nested = { value: 1 };
    const callback = () => "result";
    const input = {
      callback,
      nested,
      missing: undefined,
    };

    const actual = sortKeys(input);

    expectTypeOf(actual).toEqualTypeOf<typeof input>();
  });
});
