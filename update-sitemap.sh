#!/bin/bash

# Script to update the lastmod date in sitemap.xml
SITEMAP_FILE="sitemap.xml"
CURRENT_DATE=$(date +%Y-%m-%d)

# Check if sitemap.xml exists
if [ ! -f "$SITEMAP_FILE" ]; then
    echo "Error: $SITEMAP_FILE not found"
    exit 1
fi

# Update the lastmod date using sed
# This will replace the date in <lastmod>YYYY-MM-DD</lastmod> format
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS uses BSD sed
    sed -i '' "s|<lastmod>.*</lastmod>|<lastmod>$CURRENT_DATE</lastmod>|g" "$SITEMAP_FILE"
else
    # Linux uses GNU sed
    sed -i "s|<lastmod>.*</lastmod>|<lastmod>$CURRENT_DATE</lastmod>|g" "$SITEMAP_FILE"
fi

echo "Updated sitemap.xml lastmod to $CURRENT_DATE"

