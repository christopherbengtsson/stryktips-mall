import "@testing-library/jest-dom";
import matchers from "@testing-library/jest-dom/matchers";
import { configure, prettyDOM } from "@testing-library/dom";

import { cleanup } from "@testing-library/react";
import { afterEach, expect } from "vitest";

expect.extend(matchers);

// When debugging visual tests, you can enable this.
const enablePrettyDom = false;
// Hides large stacktraces and render output when running react component tests.
configure({
  getElementError: (message, container) => {
    const error = enablePrettyDom
      ? new Error(
          [message, prettyDOM(container, 30000)].filter(Boolean).join("\n\n")
        )
      : new Error(message ?? "");
    error.name = "TestingLibraryElementError";

    error.stack = undefined;
    return error;
  },
});

afterEach(() => {
  cleanup();
});
