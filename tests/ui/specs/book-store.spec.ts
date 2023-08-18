import { test } from "../fixtures/books-store-fixture";

// test.describe.configure({ mode: "serial" });

const EXPECTED_SEARCH_RESULTS = {
  javaFourBooks: {
    query: "java",
    expectedTitles: [
      "Learning JavaScript Design Patterns",
      "Speaking JavaScript",
      "Programming JavaScript Applications",
      "Eloquent JavaScript, Second Edition",
    ],
  },
  jsOneBook: {
    query: "You Don't Know JS",
    expectedTitles: [
      "You Don't Know JS"
    ],
  },
  playwrightNoResults: {
    query: "playwright",
    expectedTitles: [],
  },
};

test.describe("Book store  - Fixture", () => {
  test("Open book store pages", async ({ bookStorePage }) => {
    await bookStorePage.checkHeader();
  });

  test("Search 4 'java' books in Book store", async ({ bookStorePage }) => {
    await bookStorePage.typeToSearch(EXPECTED_SEARCH_RESULTS.javaFourBooks.query);
    await bookStorePage.checkSearchResultsTitles(
      EXPECTED_SEARCH_RESULTS.javaFourBooks.expectedTitles
    );
  });
  test("Search 1 JS book in Book store", async ({ bookStorePage }) => {
    await bookStorePage.typeToSearch(EXPECTED_SEARCH_RESULTS.jsOneBook.query);
    await bookStorePage.checkSearchResultsTitles(
      EXPECTED_SEARCH_RESULTS.jsOneBook.expectedTitles
    );
  });
  test("Search 'playwright' - no results in Book store", async ({ bookStorePage }) => {
    await bookStorePage.typeToSearch(EXPECTED_SEARCH_RESULTS.playwrightNoResults.query);
    await bookStorePage.checkSearchResultsTitles(
      EXPECTED_SEARCH_RESULTS.playwrightNoResults.expectedTitles
    );
  });
});
