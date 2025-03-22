# Excel Helper Regex Fix

This repository contains a fix for the regular expression error in the I Hate Excel application.

## Error Details

The application is experiencing the following error:

```
Uncaught SyntaxError: Invalid regular expression: /^[a-zA-Z0-9\\s-_]+$/: Range out of order in character class
```

## Explanation of the Issue

The error is occurring because in a regular expression character class `[...]`, the `-` (hyphen) character has special meaning when placed between two characters, indicating a range (like `a-z`).

In the current regex `/^[a-zA-Z0-9\\s-_]+$/`, the `-` is positioned between `\s` and `_`, which JavaScript is interpreting as an attempt to define a range from `\s` to `_`. This is invalid because a range must go from a character with a lower code point to one with a higher code point.

## Solution

There are two common ways to fix this issue:

### Option 1: Move the hyphen to the beginning or end of the character class

```javascript
// Move the hyphen to the end of the character class
const regex = /^[a-zA-Z0-9\s_-]+$/;
```

When placed at the beginning or end of a character class, the hyphen is interpreted as a literal hyphen, not as a range operator.

### Option 2: Escape the hyphen with a backslash

```javascript
// Escape the hyphen with a backslash
const regex = /^[a-zA-Z0-9\s\_\-]+$/;
```

The backslash before the hyphen tells JavaScript to treat it as a literal hyphen character, not as a range operator.

## Implementation

The fix has been implemented in the `src/components/ChatInput.tsx` file, using Option 1 (moving the hyphen to the end of the character class).

## How to Apply This Fix

1. Locate the `ChatInput.tsx` file in your codebase
2. Find the regular expression `/^[a-zA-Z0-9\\s-_]+$/`
3. Replace it with `/^[a-zA-Z0-9\s_-]+$/` (hyphen at the end)
4. Save the file and rebuild/reload your application

## Additional Resources

- [MDN Web Docs on Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions)
- [Special Characters in Regular Expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions/Character_Classes)
