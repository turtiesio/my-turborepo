import { ExecutionContext } from "@nestjs/common";
import { Cookies, exportForTest } from "./cookies";

describe("Cookies", () => {
  let context: ExecutionContext;

  beforeEach(() => {
    context = {
      switchToHttp: () => ({
        getRequest: () => ({
          cookies: {
            testCookie: "testValue",
            anotherCookie: "anotherValue",
          },
        }),
      }),
    } as ExecutionContext;
  });

  describe("cookieFactory", () => {
    it("should return all cookies when no data is provided", () => {
      const result = exportForTest.cookieFactory(undefined, context);
      expect(result).toEqual({
        testCookie: "testValue",
        anotherCookie: "anotherValue",
      });
    });

    it("should return a specific cookie when data is provided", () => {
      const result = exportForTest.cookieFactory("testCookie", context);
      expect(result).toBe("testValue");
    });

    it("should return undefined for non-existent cookie", () => {
      const result = exportForTest.cookieFactory("nonExistentCookie", context);
      expect(result).toBeUndefined();
    });
  });
});
