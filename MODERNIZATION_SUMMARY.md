# UserDirectoryState Modernization - Implementation Summary

## ✅ Completed

The modernization of `UserDirectoryState` to use Flarum's modern `PaginatedListState` architecture has been successfully completed.

---

## Changes Made

### 1. **New State Class: [UserDirectoryListState.ts](js/src/forum/states/UserDirectoryListState.ts)**

**Created**: `js/src/forum/states/UserDirectoryListState.ts` (TypeScript)
**Removed**: `js/src/forum/states/UserDirectoryState.js` (old JavaScript implementation)

**Key Features**:
- Extends `PaginatedListState<User, UserDirectoryParams>` from Flarum core
- Full TypeScript implementation with proper type safety
- Implements required abstract methods:
  - `type`: Returns `'users'` for API requests
  - `requestParams()`: Builds request parameters with include, filter, and sort
  - `sortMap()`: Integrates with `SortMap` utility
- Overrides `loadPage()` to support preloaded API documents
- Custom `refreshParams()` to handle `qBuilder` logic for filter queries
- **No backward compatibility layer** (clean break for new major version)

### 2. **Updated Component: [UserDirectoryList.js](js/src/forum/components/UserDirectoryList.js)**

**Changes**:
- ❌ `state.isLoading()` → ✅ `state.isLoadingNext()` - More specific loading state
- ❌ `state.moreResults` → ✅ `state.hasNext()` - Better pagination API
- ❌ `state.users` → ✅ `state.getAllItems()` - Get all users across pages
- ❌ `state.loadMore.bind(state)` → ✅ `() => state.loadNext()` - Cleaner syntax
- ❌ `state.empty()` → ✅ `state.isEmpty()` - Consistent naming

### 3. **Updated Component: [UserDirectoryPage.js](js/src/forum/components/UserDirectoryPage.js)**

**Changes**:
- Import changed from `UserDirectoryState` to `UserDirectoryListState`
- State initialization: `new UserDirectoryListState({}, 1)` - Now requires page parameter
- All `refreshParams()` calls now include page parameter: `refreshParams(params, 1)`

### 4. **Extensible SortMap: [SortMap.ts](js/src/common/utils/SortMap.ts)**

**Converted to TypeScript** with proper extensibility:

**Before** (JavaScript):
```javascript
export default class SortMap {
  sortMap() {
    return {
      username_az: 'username',
      // ...
    };
  }
}
```

**After** (TypeScript):
```typescript
export default class SortMap {
  sortMap(): Record<string, string> {
    const map: Record<string, string> = {
      username_az: 'username',
      // ...
    };
    return map;
  }
}
```

**Key Improvement**: Return type is now `Record<string, string>`, allowing extensions to add properties without TypeScript errors.

### 5. **Updated Extension Pattern: fof/best-answer**

**File**: `../best-answer/js/src/common/addBestAnswerCountSort.ts`

**Before** (using `override` - replaces entire method):
```typescript
import { override } from 'flarum/common/extend';

override(SortMap.prototype, 'sortMap', (map) => ({
  ...map(),
  most_best_answers: '-bestAnswerCount',
  least_best_answers: 'bestAnswerCount',
}));
```

**After** (using `extend` - adds to existing):
```typescript
import { extend } from 'flarum/common/extend';

extend(SortMap.prototype, 'sortMap', function (map) {
  map.most_best_answers = '-bestAnswerCount';
  map.least_best_answers = 'bestAnswerCount';
});
```

**Benefits**:
- Multiple extensions can add sorts without conflicts
- No need to spread previous values
- Cleaner, more idiomatic Flarum pattern

---

## Architecture Comparison

### Old Architecture (UserDirectoryState)
```
UserDirectoryState (standalone class)
├── users: User[] (flat array)
├── loading: boolean
├── moreResults: boolean
├── loadMore() → appends to array
└── Manual state management
```

### New Architecture (UserDirectoryListState)
```
UserDirectoryListState extends PaginatedListState
├── pages: Page<User>[] (page-based structure)
├── initialLoading, loadingNext, loadingPrev (granular states)
├── location: { page, startIndex, endIndex }
├── loadNext(), loadPrev(), goto(page)
├── getAllItems() → flattens pages
└── Inherited pagination logic from core
```

---

## Benefits

### 1. **Modern Pagination**
- Page-based architecture (not just offset-based)
- Support for `loadNext()` and `loadPrev()`
- Page number tracking for URLs
- Total items count from API metadata

### 2. **Type Safety**
- Full TypeScript implementation
- Compile-time error catching
- Better IDE autocomplete
- Self-documenting code

### 3. **Consistency with Flarum Core**
- Same patterns as `DiscussionListState`
- Easier for developers familiar with Flarum
- Can leverage future Flarum improvements
- Less maintenance burden

### 4. **Better State Management**
- Granular loading states: `isInitialLoading()`, `isLoadingNext()`, `isLoadingPrev()`
- Proper page management
- Built-in support for pagination metadata

### 5. **Extension Friendliness**
- `SortMap` now uses `extend` pattern (not `override`)
- Multiple extensions can add sorts without conflicts
- Typed as `Record<string, string>` for flexibility

---

## Breaking Changes

This is a **major version release** with intentional breaking changes:

### API Changes

| Old API | New API | Notes |
|---------|---------|-------|
| `state.users` | `state.getAllItems()` | Method call instead of property |
| `state.loading` | `state.isLoading()` or `state.isLoadingNext()` | More specific states |
| `state.moreResults` | `state.hasNext()` | Better naming |
| `state.loadMore()` | `state.loadNext()` | Consistent with `loadPrev()` |
| `state.hasUsers()` | `state.hasItems()` | Generic naming |
| `state.empty()` | `state.isEmpty()` | Better naming |
| `refreshParams(params)` | `refreshParams(params, page)` | Page parameter required |

### For Extension Developers

**SortMap Extension Pattern Changed**:
- ❌ **Old**: Use `override(SortMap.prototype, 'sortMap', ...)`
- ✅ **New**: Use `extend(SortMap.prototype, 'sortMap', ...)`

**Migration Guide for Extensions**:
```typescript
// Before
import { override } from 'flarum/common/extend';
import SortMap from 'ext:fof/user-directory/common/utils/SortMap';

override(SortMap.prototype, 'sortMap', (map) => ({
  ...map(),
  my_custom_sort: '-customField',
}));

// After
import { extend } from 'flarum/common/extend';
import SortMap from 'ext:fof/user-directory/common/utils/SortMap';

extend(SortMap.prototype, 'sortMap', function (map) {
  map.my_custom_sort = '-customField';
});
```

---

## Testing Checklist

Before releasing, verify:

- [ ] User directory page loads correctly
- [ ] Initial page load displays users
- [ ] "Load More" button works
- [ ] Loading indicator shows during data fetch
- [ ] Empty state displays when no users
- [ ] Search functionality works
- [ ] Sorting works (all sort options)
- [ ] Group filtering works
- [ ] Special filters work (e.g., suspended users)
- [ ] Preloaded data works (server-side rendering)
- [ ] Admin setting for default sort works
- [ ] Small cards toggle works
- [ ] URL parameters are preserved
- [ ] TypeScript compilation passes
- [ ] No console errors in browser

---

## Known Issues

### fof/best-answer TypeScript Errors

**Status**: Expected until this release is published

The `fof/best-answer` extension will show TypeScript errors:
```
Property 'most_best_answers' does not exist on type '{ username_az: string; ... }'
```

**Reason**: The extension is using the old type definition from the published version of `fof/user-directory`.

**Resolution**: Will be resolved automatically when the new version of `fof/user-directory` is released and `fof/best-answer` updates its dependency.

**Workaround** (if needed before release): Add type assertion in best-answer:
```typescript
extend(SortMap.prototype, 'sortMap', function (map: Record<string, string>) {
  map.most_best_answers = '-bestAnswerCount';
  map.least_best_answers = 'bestAnswerCount';
});
```

---

## Files Modified

### User Directory Extension
- ✅ Created: `js/src/forum/states/UserDirectoryListState.ts`
- ✅ Deleted: `js/src/forum/states/UserDirectoryState.js`
- ✅ Modified: `js/src/forum/components/UserDirectoryList.js`
- ✅ Modified: `js/src/forum/components/UserDirectoryPage.js`
- ✅ Converted: `js/src/common/utils/SortMap.js` → `js/src/common/utils/SortMap.ts`
- ✅ Updated: `MODERNIZATION_PLAN.md` (marked as completed)

### Best Answer Extension (companion changes)
- ✅ Modified: `js/src/common/addBestAnswerCountSort.ts` (changed from `override` to `extend`)

---

## Next Steps

1. **Test thoroughly** using the checklist above
2. **Update CHANGELOG.md** with breaking changes
3. **Update README.md** if needed (API examples)
4. **Bump version** to next major version (e.g., 1.x.x → 2.0.0)
5. **Release** to packagist
6. **Update fof/best-answer** dependency and release compatible version

---

## Documentation for Extension Developers

Add this to your README or documentation:

### Extending Sort Options

To add custom sort options to the user directory:

```typescript
import { extend } from 'flarum/common/extend';
import SortMap from 'ext:fof/user-directory/common/utils/SortMap';

export default function() {
  extend(SortMap.prototype, 'sortMap', function (map) {
    map.my_sort_key = 'fieldName';        // Ascending
    map.my_sort_key_desc = '-fieldName';   // Descending
  });
}
```

Don't forget to add translations:
```yaml
fof-user-directory:
  lib:
    sort:
      my_sort_key: "My Custom Sort"
      my_sort_key_desc: "My Custom Sort (Descending)"
```

---

## Performance Notes

- **Memory efficiency**: Page-based architecture allows clearing old pages
- **Loading states**: More granular states prevent race conditions
- **Type safety**: Compile-time checks prevent runtime errors
- **Bundle size**: Minimal increase due to TypeScript compilation

---

## Migration Timeline

1. **v1.x** - Old architecture with `UserDirectoryState`
2. **v2.0** - New architecture with `UserDirectoryListState` (THIS RELEASE)
3. **Future** - Potential additions:
   - Jump to page functionality
   - Infinite scroll (bidirectional)
   - Server-side pagination controls
   - Virtual scrolling for large lists

---

## Credits

- Modernization based on Flarum core's `DiscussionListState` and `PaginatedListState`
- Pattern follows Flarum v2.x best practices
- Compatible with Flarum `^2.0.0-beta`
