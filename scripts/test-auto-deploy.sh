#!/bin/bash

# Test script untuk auto-deploy artikel
# Script ini mensimulasikan deploy tanpa benar-benar commit dan push

set -e

REPO_PATH="/home/dev/web/koneksi/konxc.github.io"
BLOG_DIR="$REPO_PATH/src/content/blog"

echo "=== Test Auto-Deploy Script ==="
echo ""

cd "$REPO_PATH" || exit 1

# Get today's date
TODAY=$(date +"%Y-%m-%d")
WEEKDAY=$(date +"%A")

echo "Tanggal hari ini: $TODAY ($WEEKDAY)"
echo ""

# Find articles with today's publishDate
echo "Mencari artikel dengan publishDate: $TODAY"
echo ""

ARTICLES_FOUND=0

for file in "$BLOG_DIR"/*.md; do
    [ ! -f "$file" ] && continue
    
    FILENAME=$(basename "$file")
    PUBLISH_DATE=$(grep -E "^publishDate:" "$file" | head -1 | sed 's/publishDate:[[:space:]]*//' | tr -d '"' | xargs)
    TITLE=$(grep -E "^title:" "$file" | head -1 | sed 's/title:[[:space:]]*"\(.*\)"/\1/' | sed "s/title:[[:space:]]*'\(.*\)'/\1/")
    
    if [ -n "$PUBLISH_DATE" ]; then
        echo "📄 $FILENAME"
        echo "   Title: $TITLE"
        echo "   Publish Date: $PUBLISH_DATE"
        
        if [ "$PUBLISH_DATE" = "$TODAY" ]; then
            echo "   ✅ AKAN DI-DEPLOY HARI INI"
            ARTICLES_FOUND=$((ARTICLES_FOUND + 1))
        else
            echo "   ⏳ Akan di-deploy pada: $PUBLISH_DATE"
        fi
        echo ""
    fi
done

echo "=== Summary ==="
echo "Artikel yang akan di-deploy hari ini: $ARTICLES_FOUND"
echo ""

if [ $ARTICLES_FOUND -eq 0 ]; then
    echo "ℹ️  Tidak ada artikel yang perlu di-deploy hari ini."
    echo ""
    echo "Artikel berikutnya akan di-deploy:"
    echo ""
    
    # Find next article
    NEXT_DATE=""
    NEXT_TITLE=""
    for file in "$BLOG_DIR"/*.md; do
        [ ! -f "$file" ] && continue
        PUBLISH_DATE=$(grep -E "^publishDate:" "$file" | head -1 | sed 's/publishDate:[[:space:]]*//' | tr -d '"' | xargs)
        if [ -n "$PUBLISH_DATE" ] && [ "$PUBLISH_DATE" \> "$TODAY" ]; then
            if [ -z "$NEXT_DATE" ] || [ "$PUBLISH_DATE" \< "$NEXT_DATE" ]; then
                NEXT_DATE="$PUBLISH_DATE"
                NEXT_TITLE=$(grep -E "^title:" "$file" | head -1 | sed 's/title:[[:space:]]*"\(.*\)"/\1/')
            fi
        fi
    done
    
    if [ -n "$NEXT_DATE" ]; then
        echo "   📅 $NEXT_DATE"
        echo "   📝 $NEXT_TITLE"
    fi
fi

echo ""
echo "=== Test selesai ==="

