import { test } from "../fixtures/books-store-fixture";

test.describe.configure({ mode: "serial" });

const EXPECTED_SEARCH_RESULTS = {
  java: {
    query: "java",
    expectedTitles: [
      "Learning JavaScript Design Patterns",
      "Speaking JavaScript",
      "Programming JavaScript Applications",
      "Eloquent JavaScript, Second Edition",
    ],
  },
};

test.describe("Book store  - Fixture", () => {
  test("Open book store pages", async ({ bookStorePage }) => {
    await bookStorePage.checkHeader();
  });

  test.only("Search java books in Book store", async ({ bookStorePage }) => {
    await bookStorePage.typeToSearch("java");
    await bookStorePage.checkSearchResultsTitles(
      EXPECTED_SEARCH_RESULTS.java.expectedTitles
    );
  });
});
