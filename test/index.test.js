const path = require('node:path');
const { joinRight: pathRightJoin } = require('../index');

test("should behave like native path.join for normal paths", () => {
  const result = pathRightJoin('src', './utils', './index.js');
  const toBeEqual = path.join('src', './utils', './index.js');
  expect(result).toEqual(toBeEqual);
});

test('should skip ".." and the segment immediately following it', () => {
  const result = pathRightJoin('..', 'src', 'dist', 'main.js');
  const toBeEqual = path.join('dist', "main.js");
  expect(result).toEqual(toBeEqual);
});

test('simple test', () => {
  const result = pathRightJoin("../", "/path/ab.js");
  const toBeEqual = path.join("ab.js");
  expect(result).toEqual(toBeEqual);
});

test('simple test 2', () => {
  // Failing Edge case
  const result = pathRightJoin("/../", "/path/ab.js");
  const toBeEqual = path.join("/ab.js");
  expect(result).toEqual(toBeEqual);
});

it('should handle multiple ".." segments correctly', () => {
  const result = pathRightJoin('..', 'src', '..', 'dist', 'main.js');
  const toBeEqual = path.join('main.js');
  expect(result).toEqual(toBeEqual);
});

it('should return empty string when all segments are skipped', () => {
  const result = pathRightJoin('..', 'a', '..', 'b', '..', 'c');
  const toBeEqual = path.join("");
  expect(result).toEqual(toBeEqual);
});

it('should normalize mixed slashes across platforms', () => {
  const result = pathRightJoin('src//', 'utils\\', '..', 'core');
  const toBeEqual = path.join('src', 'utils', "core", "..")
  expect(result).toEqual(toBeEqual);
});

it('should resolve absolute paths by skipping ".." correctly', () => {
  const result = pathRightJoin('/usr', '..', 'bin');
  const toBeEqual = path.join('/usr')
  expect(result).toEqual(toBeEqual);
});

it('should handle edge case: single segment', () => {
  const result = pathRightJoin('only-this');
  const toBeEqual = path.join('only-this');
  expect(result).toEqual(toBeEqual);
});

it('should handle edge case: all ".."', () => {
  const result = pathRightJoin('..', '..', '..');
  const toBeEqual = path.join("..", "..", "..");
  expect(result).toEqual(toBeEqual);
});

it('should handle edge case: empty path', () => {
  const result = pathRightJoin();
  const toBeEqual = path.join();
  expect(result).toEqual(toBeEqual);
});