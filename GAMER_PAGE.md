# Gamer Vault - Secret Page

A hidden gaming archive page accessible via a secret code Easter egg.

## 🎮 Access Methods

### 1. Secret Code (Easter Egg)
Type `g-a-m-e-r` anywhere on the website to unlock the secret page.
- A notification will appear: **"GAMER MODE ACTIVATED"**
- After 2 seconds, you'll be automatically redirected to the Gamer Vault

### 2. Direct URL
Navigate directly to: `/portfolio-v3/gamer`

## ✨ Features

- **Gaming Theme**: Purple/blue gradient color scheme with glowing effects
- **Video Gallery**: Grid layout displaying gaming clips from YouTube
- **Modal Player**: Click any video to watch in full-screen embedded YouTube player
- **Game Badges**: Each video shows which game it's from
- **Smooth Animations**: Powered by Framer Motion for fluid transitions
- **No Upload Required**: Videos are managed via JSON file

## 📁 Managing Videos

Videos are stored in `src/data/gamerVideos.json`. **Video titles and upload dates are automatically fetched from YouTube** - you only need to provide the URL and game name!

```json
{
  "videos": [
    {
      "id": "unique-id",
      "url": "https://youtu.be/VIDEO_ID",
      "game": "Game Name"
    }
  ]
}
```

### Adding a New Video

1. Open `src/data/gamerVideos.json`
2. Add a new object to the `videos` array:
   ```json
   {
     "id": "2",
     "url": "https://youtu.be/YOUR_VIDEO_ID",
     "game": "CS:GO"
   }
   ```
3. Save the file - the title will be fetched automatically from YouTube!

### What Gets Auto-Fetched

- ✅ **Video Title**: Fetched directly from YouTube using oEmbed API
- ✅ **Thumbnail**: High-quality thumbnail from YouTube
- ℹ️ **Upload Date**: Uses current date (YouTube oEmbed doesn't provide original upload date)

### Supported Video Formats

- YouTube URLs (youtube.com/watch, youtu.be, youtube.com/shorts)
- Automatically extracts video ID and displays thumbnail
- Embedded YouTube player in modal

## 🎨 Theme

- **Primary Colors**: Purple (#8b5cf6) and Blue (#3b82f6)
- **Background**: Dark gradient (#0a0e27 to #1a1f3a)
- **Icons**: Gamepad2, Trophy, Zap, Award
- **Effects**: Glowing orbs, grid pattern, smooth hover animations

## 🔧 Technical Details

### Files Created
- `src/pages/GamerPage.tsx` - Main page component
- `src/data/gamerVideos.json` - Video data storage
- `src/components/common/SecretCodeIndicator.tsx` - Updated notification

### Files Modified
- `src/App.tsx` - Added `/gamer` route and secret code handler
- `src/main.tsx` - Added HelmetProvider for SEO

### Dependencies Used
- `framer-motion` - Animations
- `lucide-react` - Icons
- `react-helmet-async` - SEO meta tags
- `react-router-dom` - Routing

## 🎯 Design Philosophy

The page is designed to feel like a premium gaming vault with:
- Futuristic aesthetics
- Smooth, responsive interactions
- Clear visual hierarchy
- Engaging hover effects
- Professional polish

## 📝 Notes

- Videos load from JSON on page mount
- No backend required - all client-side
- Thumbnails fetched from YouTube
- Page is outside main Layout for full-screen experience
- Secret code works globally across all pages
