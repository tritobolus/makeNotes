import Fuse from "fuse.js";

export const filterNote = (notes, searchQuery) => {
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    // ignoreDiacritics: false,
    // shouldSort: true,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    // useExtendedSearch: false,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ["title", "description"],
  };

  const fuse = new Fuse(notes, fuseOptions);

  // Change the pattern
  const searchPattern = searchQuery;
  const result = fuse.search(searchPattern)
  return result
};