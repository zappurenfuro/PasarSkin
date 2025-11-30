# Google Sheets Gallery Setup Guide

## Step 1: Create Your Google Sheet

1. Go to https://sheets.google.com
2. Click **+ Blank** to create a new spreadsheet
3. Name it "PasarSkin Gallery" or whatever you like

## Step 2: Set Up Your Columns

In the first row (headers), create these two columns:
- **A1**: `imageUrl`
- **B1**: `altText`

Then add your data (starting from row 2):
- **Column A**: Direct image URLs (from Imgur, Google Drive, etc.)
- **Column B**: Description of the item (optional, e.g., "AK-47 Redline")

### Example:
```
| imageUrl                              | altText          |
|---------------------------------------|------------------|
| https://i.imgur.com/abc123.jpg        | AWP Dragon Lore  |
| https://i.imgur.com/def456.jpg        | AK-47 Redline    |
| https://i.imgur.com/ghi789.jpg        | Karambit Fade    |
```

## Step 3: Publish Your Sheet as CSV

1. Click **File** → **Share** → **Publish to web**
2. In the dropdown, select:
   - **Entire Document** OR your specific sheet name
   - Format: **Comma-separated values (.csv)**
3. Click **Publish**
4. **Copy the URL** that appears (it will look like: `https://docs.google.com/spreadsheets/d/e/...`)

## Step 4: Update Your Website

1. Open `script.js` in your website folder
2. Find this line (near the top of the Gallery section):
   ```javascript
   const GOOGLE_SHEETS_URL = 'YOUR_GOOGLE_SHEETS_CSV_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SHEETS_CSV_URL_HERE'` with your copied URL
4. Save the file

## Step 5: Get Image URLs

### Option A: Using Imgur (Easiest)
1. Go to https://imgur.com
2. Click **New post** and upload your image
3. After upload, right-click the image → **Copy image address**
4. Paste this URL in column A of your Google Sheet

### Option B: Using Google Drive
1. Upload image to Google Drive
2. Right-click → **Get link** → Set to **Anyone with the link can view**
3. Copy the file ID from the URL (the long string after `/d/`)
4. Use this format: `https://drive.google.com/uc?export=view&id=FILE_ID_HERE`

### Option C: Using imgbb
1. Go to https://imgbb.com
2. Upload your image
3. Copy the **Direct link**
4. Paste in your Google Sheet

## Step 6: Push to GitHub

```powershell
git add .
git commit -m "Add Google Sheets gallery integration"
git push origin main
```

## How to Update Gallery (After Setup):

1. Upload new image to Imgur/Drive/imgbb
2. Copy the image URL
3. Add a new row to your Google Sheet with the URL
4. **That's it!** Your website updates automatically (may take 1-2 minutes)

## Tips:

- Images should be approximately **4:5 ratio** (e.g., 800x1000px)
- Use `.jpg` or `.png` format
- Keep file sizes under 2MB for fast loading
- The gallery shows images in the order they appear in your sheet
- To remove an item, just delete the row from your sheet

## Troubleshooting:

- **Gallery not loading?** Check that your sheet is published and the URL is correct
- **Images not showing?** Make sure the image URLs are direct links (end in .jpg, .png, etc.)
- **Need to refresh?** Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
