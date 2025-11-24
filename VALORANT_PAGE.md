# 🎮 Secret Valorant Page - Easter Egg Guide

## How to Access the Secret Page

I've created a hidden Valorant-themed page where you can upload and showcase your gameplay clips! Here's how to access it:

### Method 1: Secret Key Sequence (Easter Egg) 🔐
Simply type the letters **V-A-L-O-R-A-N-T** (in order) anywhere on your portfolio website. You'll see a special notification appear, and you'll be automatically redirected to the secret page!

**Steps:**
1. Visit any page on your portfolio
2. Type: `v` `a` `l` `o` `r` `a` `n` `t` (one letter at a time)
3. Watch for the animated notification
4. You'll be redirected to the secret Valorant page!

### Method 2: Direct URL 🔗
You can also access it directly by navigating to:
```
/portfolio-v3/valorant
```

## Features

### 🎨 Valorant-Themed Design
- **Dark Red/Black Color Scheme**: Matches Valorant's signature aesthetic
- **Animated Background**: Pulsing red glow and grid pattern
- **Angular UI Elements**: Corner decorations and borders inspired by the game
- **"CLASSIFIED" Badge**: Adds to the secret/exclusive feel

### 📹 Video Management
- **Upload Multiple Videos**: Drag and drop or click to upload MP4, WEBM, or MOV files
- **Grid Gallery**: Beautiful 3-column responsive grid layout
- **Video Preview**: Hover over clips to see play button overlay
- **Full-Screen Player**: Click any video to watch in a modal player
- **Delete Function**: Remove clips you no longer want

### ✨ Animations
- **Smooth Transitions**: Framer Motion animations throughout
- **Hover Effects**: Interactive elements respond to mouse movement
- **Loading Animations**: Staggered fade-in for video cards
- **Glowing Effects**: Pulsing shadows and highlights

## Technical Details

### Files Created
1. **`src/pages/ValorantPage.tsx`** - Main Valorant page component
2. **`src/hooks/useSecretCode.ts`** - Custom hook for detecting key sequences
3. **`src/components/common/SecretCodeIndicator.tsx`** - Notification component

### Files Modified
1. **`src/App.tsx`** - Added route and secret code handler

### How It Works
The secret code detection uses a custom React hook that listens for keyboard events. When you type the correct sequence (V-A-L-O-R-A-N-T), it:
1. Triggers a callback function
2. Shows an animated notification
3. Waits 2 seconds
4. Navigates to `/valorant`

## Customization Ideas

Want to change the secret code? Edit `src/App.tsx` line 54:
```typescript
useSecretCode(['v', 'a', 'l', 'o', 'r', 'a', 'n', 't'], handleSecretUnlocked);
```

Change the array to any sequence of keys you want!

## Future Enhancements
- Add video editing/trimming
- Add tags/categories for clips
- Add sharing functionality
- Integrate with cloud storage
- Add stats tracking (kills, deaths, etc.)

---

**Enjoy your secret Valorant archive! 🎯**
