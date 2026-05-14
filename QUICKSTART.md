#  Tuktokra - Data Management Guide

## Everything is in `data.json`! 

You now have **complete control** over all website content without touching any code. Just edit `data.json` and everything updates automatically!

---

##  What's in data.json?

```json
{
  "siteInfo": { ... },           // Site name, logo, tagline
  "navigation": [ ... ],          // Navigation menu links
  "stats": { ... },               // Numbers (mountains, hikers, etc.)
  "featuredHikes": [ ... ],       // Homepage featured hikes
  "expeditions": [ ... ],         // Hikes.html expedition listings
  "guides": [ ... ],              // Guides.html mountain guides
  "gallery": [ ... ],             // Gallery.html images
  "testimonials": [ ... ],        // Homepage testimonials
  "upcomingEvents": [ ... ],      // Homepage event previews
  "contactInfo": { ... },         // Contact page info
  "aboutPage": { ... },           // About page content
  "faq": [ ... ],                 // FAQ sections
  "footer": { ... }               // Footer content
}
```

---

##  Edit Examples

### 1️⃣ Change Site Name & Logo

**Location:** `siteInfo`

```json
{
  "siteInfo": {
    "siteName": "MyAdventure",      // ← Change here
    "logo": "🏔️",                   // ← Change logo (any emoji)
    "tagline": "Your new tagline",   // ← Change tagline
    "description": "Your description"
  }
}
```

---

### 2️⃣ Update Statistics Numbers

**Location:** `stats`

```json
{
  "stats": {
    "mountainsClimbed": 300,       // ← Update number
    "happyHikers": 2000,           // ← Update number
    "expertGuides": 75,            // ← Update number
    "milesTraveled": 15000         // ← Update number
  }
}
```

---

### 3️⃣ Add/Edit Featured Hikes (Homepage)

**Location:** `featuredHikes`

```json
{
  "featuredHikes": [
    {
      "id": 1,
      "title": "Alpine Meadow Trail",          // ← Hike name
      "difficulty": "easy",                    // ← easy/moderate/hard
      "duration": "4 hours",                   // ← Duration
      "elevation": "1,850m",                   // ← Elevation
      "distance": "8km",                       // ← Distance
      "description": "Experience...",          // ← Description
      "image": "https://images.unsplash.com/..." // ← Image URL
    },
    // ... more hikes
  ]
}
```

---

### 4️⃣ Update Expeditions (Hikes Page)

**Location:** `expeditions`

```json
{
  "expeditions": [
    {
      "id": 1,
      "title": "Himalayan Expedition",
      "difficulty": "hard",
      "date": "March 15-25, 2026",
      "dateMonth": "Mar",                 // ← 3-letter month
      "dateDay": "15",                    // ← Day number
      "location": "Himalayas, Nepal",
      "description": "Conquer...",
      "duration": "10 days",
      "distance": "85km",
      "elevation": "5,000m",
      "groupSize": "12-15 people",
      "inclusions": [
        "Professional mountain guides",   // ← List of includes
        "Camping and lodging",
        "Meals (breakfast, lunch, dinner)"
      ],
      "price": 85000                      // ← Price in ₹
    },
    // ... more expeditions
  ]
}
```

---

### 5️⃣ Update Mountain Guides (Guides Page)

**Location:** `guides`

```json
{
  "guides": [
    {
      "id": 1,
      "title": "Mount Everest",
      "difficulty": "hard",
      "location": "Nepal & Tibet",
      "elevation": "8,849m",
      "duration": "2 months",
      "distance": "230km",
      "image": "https://...",
      "description": "The world's highest...",
      "itinerary": [                      // ← Step-by-step itinerary
        "Base camp arrival and acclimatization",
        "Lower camp setup and training",
        "Camp 1-2 progression"
      ],
      "essentials": [                     // ← What to bring
        "High-altitude climbing boots",
        "Insulated jacket and layers"
      ],
      "safety": [                         // ← Safety tips
        "Always climb with a certified guide",
        "Acclimatize properly to altitude"
      ]
    },
    // ... more guides
  ]
}
```

---

### 6️⃣ Update Gallery Images

**Location:** `gallery`

```json
{
  "gallery": [
    {
      "id": 1,
      "title": "Sunset Peak",
      "category": "mountains",            // ← mountains/community/landscapes/wildlife
      "image": "https://images.unsplash.com/photo-xxxxx?w=800",
      "description": "Golden hour at the mountain peak"
    },
    {
      "id": 2,
      "title": "Team Summit",
      "category": "community",
      "image": "https://images.unsplash.com/photo-yyyyy?w=800",
      "description": "Our community celebrating at the summit"
    }
    // ... more images
  ]
}
```

**Pro Tip:** Get free images from:
- [Unsplash](https://unsplash.com)
- [Pexels](https://pexels.com)
- [Pixabay](https://pixabay.com)

---

### 7️⃣ Update Testimonials

**Location:** `testimonials`

```json
{
  "testimonials": [
    {
      "id": 1,
      "name": "Sarah Johnson",
      "text": "An unforgettable experience! The guides were...",
      "rating": 5,                        // ← 1-5 stars
      "image": "https://..."              // ← Profile image
    },
    // ... more testimonials
  ]
}
```

---

### 8️⃣ Update Contact Information

**Location:** `contactInfo`

```json
{
  "contactInfo": {
    "email": "info@tuktokra.com",
    "phone": "+1 (555) 123-4567",
    "address": "123 Mountain Road, Alpine Valley, CA 90210",
    "hours": "Monday - Friday: 9 AM - 6 PM | Weekend: 10 AM - 5 PM",
    "socialLinks": [
      {
        "platform": "Facebook",
        "url": "https://facebook.com/yourpage",
        "icon": "f"
      },
      {
        "platform": "Instagram",
        "url": "https://instagram.com/yourpage",
        "icon": "📷"
      }
    ]
  }
}
```

---

### 9️⃣ Update FAQ

**Location:** `faq`

```json
{
  "faq": [
    {
      "question": "What experience level do I need?",
      "answer": "We offer expeditions for all levels, from beginners..."
    },
    {
      "question": "What's included in the price?",
      "answer": "Most packages include guides, accommodation..."
    }
    // ... more FAQs
  ]
}
```

---

### 🔟 Update About Page

**Location:** `aboutPage`

```json
{
  "aboutPage": {
    "story": "Founded in 2015, Tuktokra began as...",
    "mission": "To inspire and empower adventurers...",
    "vision": "A world where every person experiences...",
    "values": "Integrity, Community, Adventure, Sustainability",
    "teamMembers": [
      {
        "name": "John Summit",
        "role": "Founder & Lead Guide",
        "bio": "20+ years of mountaineering experience",
        "image": "https://..."
      }
      // ... more team members
    ]
  }
}
```

---

## 🎨 Customization Tips

### Change Colors?
Edit `css/style.css` - look for CSS variables at the top:
```css
:root {
    --primary-color: #2c5f2d;
    --primary-dark: #1a3a1b;
    --accent-color: #d4af37;
}
```

### Change Fonts?
Edit the Google Fonts link in HTML `<head>` tags.

### Change Number Formats?
Edit `data.json` numbers and they update instantly!

---

## ✅ How It Works

1. **You edit** `data.json`
2. **JavaScript automatically loads** the data on page load
3. **HTML updates** with your new content
4. **No code changes needed!**

That's it! 🎉

---

## 🔗 Image URLs Guide

### Get Free Images:
```
Unsplash: https://images.unsplash.com/photo-XXXXX?w=800&h=600&fit=crop
Pexels:   https://images.pexels.com/photos/XXXXX/
Pixabay:  https://pixabay.com/get/XXXXX/
```

### How to use Unsplash URLs:
1. Go to unsplash.com
2. Search for image (e.g., "mountain hiking")
3. Right-click image → Copy image address
4. Paste into `data.json`

---

## 🚨 Common Mistakes to Avoid

❌ **Don't:** Remove commas between array items
```json
{
  "items": [
    { "name": "Item 1" },  // ← Don't forget this comma!
    { "name": "Item 2" }
  ]
}
```

❌ **Don't:** Use single quotes instead of double quotes
```json
// WRONG:
{ 'name': 'John' }

// RIGHT:
{ "name": "John" }
```

❌ **Don't:** Add trailing commas
```json
// WRONG:
{ "name": "John", }

// RIGHT:
{ "name": "John" }
```

---

## ✔️ Validate Your JSON

If something breaks, use [jsonlint.com](https://jsonlint.com) to validate your JSON.

---

## 🎯 Editing Workflow

1. Open `data.json` in VS Code
2. Find the section you want to edit
3. Make your changes
4. Save the file (Ctrl+S)
5. Refresh the website in browser
6. Done! ✅

---

## 📞 Need Help?

- **JSON validation:** [jsonlint.com](https://jsonlint.com)
- **Free images:** [unsplash.com](https://unsplash.com)
- **JSON format:** [json.org](https://www.json.org)

---

**Happy editing! 🏔️** Your website is now completely data-driven!
