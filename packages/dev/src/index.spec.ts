import { rerefDev } from ".";

describe("reref-dev", () => {
    it("should not raise an exception", () => {
        rerefDev();
        expect(true).toBe(true);
    });
});
