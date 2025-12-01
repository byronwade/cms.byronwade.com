# Performance Improvement Opportunities

This document outlines identified performance improvement opportunities in the CMS codebase.

## 🔴 Critical Issues

### 1. Large Icon Imports from lucide-react
**Impact:** High - Increases bundle size significantly
**Files Affected:**
- `app/page.tsx` - Imports 30+ icons at once
- `components/top-nav.tsx` - Imports 20+ icons at once  
- `app/cms/media/page.tsx` - Imports 25+ icons at once
- 71+ files total importing from lucide-react

**Solution:**
- Use dynamic imports for icons that are conditionally rendered
- Consider using a barrel export file that re-exports only needed icons
- Use tree-shaking by importing individual icons: `import { Icon } from 'lucide-react'` instead of destructuring many at once

**Example Fix:**
```typescript
// Before
import { Search, Plus, Filter, FileIcon, ImageIcon, VideoIcon, ... } from "lucide-react";

// After - Use dynamic imports for conditional icons
import { Search, Plus } from "lucide-react";
const Filter = dynamic(() => import("lucide-react").then(mod => ({ default: mod.Filter })), { ssr: false });
```

### 2. Heavy Libraries Loaded Synchronously
**Impact:** High - Blocks initial page load
**Files Affected:**
- `app/cms/content/[...slug]/page.tsx` - BlockNote loaded synchronously
- `app/cms/build/page.tsx` - ReactFlow loaded synchronously (1700+ lines)
- `app/cms/media/page.tsx` - framer-motion loaded synchronously

**Solution:**
- Use Next.js dynamic imports with `ssr: false` for client-only heavy libraries
- Add loading states and Suspense boundaries

**Example Fix:**
```typescript
// Before
import { BlockNoteView } from "@blocknote/mantine";

// After
const BlockNoteView = dynamic(() => import("@blocknote/mantine").then(mod => ({ default: mod.BlockNoteView })), {
  ssr: false,
  loading: () => <div>Loading editor...</div>
});
```

### 3. Missing React.memo on Frequently Re-rendering Components
**Impact:** Medium - Causes unnecessary re-renders
**Files Affected:**
- `components/top-nav.tsx` - Large component with many state variables
- `app/cms/media/page.tsx` - Complex component with filtering/sorting
- `app/cms/build/page.tsx` - Very large component (1700+ lines)

**Solution:**
- Wrap child components in React.memo
- Memoize expensive computations with useMemo
- Use useCallback for event handlers passed to children

## 🟡 Medium Priority Issues

### 4. API Route Caching Optimization
**Impact:** Medium - Improves response times
**File:** `app/api/content/[...slug]/route.ts`

**Current Issues:**
- Cache-Control headers are good but could be optimized
- No revalidation strategy for stale content
- File system operations could be cached

**Solution:**
```typescript
// Add more aggressive caching for GET requests
headers: {
  "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
}
```

### 5. Missing Suspense Boundaries
**Impact:** Medium - Improves perceived performance
**Files Affected:**
- All page components that fetch data
- Components using dynamic imports

**Solution:**
- Wrap dynamic imports in Suspense
- Add loading.tsx files for route segments
- Use React Suspense for data fetching boundaries

### 6. Font Loading Strategy
**Impact:** Low-Medium - Improves FCP (First Contentful Paint)
**File:** `app/layout.tsx`

**Current:**
```typescript
const inter = Inter({ 
  subsets: ["latin"],
  display: "swap",
  preload: true,
});
```

**Optimization:**
- Consider using `variable` for CSS variables instead of className
- Add `fallback` font family
- Consider subsetting fonts further if only specific characters are needed

### 7. Large Component Files
**Impact:** Medium - Affects code splitting
**Files:**
- `app/cms/build/page.tsx` - 1741 lines (should be split)
- `app/cms/media/page.tsx` - 545 lines
- `components/top-nav.tsx` - 411 lines

**Solution:**
- Split into smaller, focused components
- Extract logic into custom hooks
- Use code splitting for different sections

### 8. Missing useMemo/useCallback
**Impact:** Medium - Prevents unnecessary re-renders
**Files Affected:**
- `app/cms/media/page.tsx` - filteredFiles and sortedFiles recalculated on every render
- `components/top-nav.tsx` - NavLinks component recreated on every render

**Example Fix:**
```typescript
// Before
const filteredFiles = filesWithPath.filter(...);

// After
const filteredFiles = useMemo(() => {
  return filesWithPath.filter(...);
}, [filesWithPath, searchQuery, selectedFilter]);
```

## 🟢 Low Priority / Nice to Have

### 9. Image Optimization
**Impact:** Low - Already using Next.js Image component
**Status:** ✅ Good - Using `next/image` in media page

### 10. Bundle Analysis
**Impact:** Low - Helps identify other opportunities
**Recommendation:**
- Run `next build --analyze` to see bundle sizes
- Consider removing unused dependencies
- Check for duplicate dependencies

### 11. Client Component Layout
**Impact:** Low - Minor optimization
**File:** `app/cms/layout.tsx`

**Issue:** Entire layout is a client component when only keyboard handler needs to be client-side

**Solution:**
- Extract keyboard handler to separate client component
- Keep layout as server component

### 12. Zustand Store Optimization
**Impact:** Low - Minor performance gain
**Files:** Store files in `app/cms/*/store.ts`

**Recommendation:**
- Use selectors to prevent unnecessary re-renders
- Split stores if they're too large

## 📊 Performance Metrics to Track

After implementing these changes, monitor:
1. **Bundle Size** - Should decrease by 20-30%
2. **First Contentful Paint (FCP)** - Should improve by 15-25%
3. **Time to Interactive (TTI)** - Should improve by 20-30%
4. **Largest Contentful Paint (LCP)** - Should improve by 10-20%

## 🚀 Quick Wins (Start Here)

1. **Dynamic import for BlockNote** - 5 min, high impact
2. **Dynamic import for ReactFlow** - 5 min, high impact  
3. **Memoize filteredFiles in media page** - 2 min, medium impact
4. **Split large icon imports** - 10 min, high impact
5. **Add Suspense to dynamic imports** - 5 min, medium impact

## 📝 Implementation Priority

1. **Week 1:** Critical issues (#1, #2, #3)
2. **Week 2:** Medium priority (#4, #5, #7, #8)
3. **Week 3:** Low priority and optimizations (#6, #9, #11, #12)

