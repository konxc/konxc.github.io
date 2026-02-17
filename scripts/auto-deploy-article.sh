#!/bin/bash

# Auto-deploy artikel script untuk website Koneksi
# Script ini akan commit dan push artikel yang publishDate-nya sesuai dengan hari ini
# Dijalankan via cron setiap Rabu dan Jumat

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Configuration
REPO_PATH="/home/dev/web/koneksi/konxc.github.io"
BLOG_DIR="$REPO_PATH/src/content/blog"
LOG_FILE="$REPO_PATH/logs/auto-deploy.log"
BRANCH="main"  # Atau "master" sesuai repository Anda

# Create log directory if not exists
mkdir -p "$(dirname "$LOG_FILE")"

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1" | tee -a "$LOG_FILE"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
}

# Get today's date in YYYY-MM-DD format
TODAY=$(date +"%Y-%m-%d")
WEEKDAY=$(date +"%A")

log_info "=== Auto-deploy artikel dimulai ==="
log_info "Tanggal: $TODAY ($WEEKDAY)"
log_info "Repo: $REPO_PATH"

# Change to repo directory
cd "$REPO_PATH" || {
    log_error "Tidak bisa masuk ke directory: $REPO_PATH"
    exit 1
}

# Check if git repo
if [ ! -d ".git" ]; then
    log_error "Directory bukan git repository!"
    exit 1
fi

# Check if we're on the correct branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
    log_warn "Saat ini di branch: $CURRENT_BRANCH (seharusnya: $BRANCH)"
    log_info "Mencoba checkout ke $BRANCH..."
    git checkout "$BRANCH" || {
        log_error "Tidak bisa checkout ke $BRANCH"
        exit 1
    }
fi

# Find articles that should be published today
log_info "Mencari artikel dengan publishDate: $TODAY"

ARTICLES_TO_PUBLISH=()

# Loop through all markdown files in blog directory
for file in "$BLOG_DIR"/*.md; do
    # Check if file exists (avoid errors if no files match)
    [ ! -f "$file" ] && continue
    
    # Extract publishDate from frontmatter
    PUBLISH_DATE=$(grep -E "^publishDate:" "$file" | head -1 | sed 's/publishDate:[[:space:]]*//' | tr -d '"' | xargs)
    
    if [ -z "$PUBLISH_DATE" ]; then
        continue
    fi
    
    # Check if publishDate matches today
    if [ "$PUBLISH_DATE" = "$TODAY" ]; then
        FILENAME=$(basename "$file")
        ARTICLES_TO_PUBLISH+=("$FILENAME")
        log_info "Artikel ditemukan: $FILENAME"
    fi
done

# If no articles to publish, exit gracefully
if [ ${#ARTICLES_TO_PUBLISH[@]} -eq 0 ]; then
    log_info "Tidak ada artikel yang perlu di-deploy hari ini ($TODAY)"
    log_info "=== Auto-deploy selesai ==="
    exit 0
fi

log_info "Ditemukan ${#ARTICLES_TO_PUBLISH[@]} artikel untuk di-deploy:"
for article in "${ARTICLES_TO_PUBLISH[@]}"; do
    log_info "  - $article"
done

# Pull latest changes first
log_info "Pull latest changes dari remote..."
git pull origin "$BRANCH" || {
    log_error "Gagal pull dari remote. Aborting."
    exit 1
}

# Check if there are uncommitted changes (other than our articles)
git add "$BLOG_DIR"/*.md 2>/dev/null || true
OTHER_CHANGES=$(git status --porcelain | grep -v "src/content/blog/.*\.md$" || true)

if [ -n "$OTHER_CHANGES" ]; then
    log_warn "Ada perubahan lain selain artikel:"
    echo "$OTHER_CHANGES" | while read line; do
        log_warn "  $line"
    done
fi

# Stage article files
for article in "${ARTICLES_TO_PUBLISH[@]}"; do
    ARTICLE_PATH="$BLOG_DIR/$article"
    if git add "$ARTICLE_PATH"; then
        log_info "Staged: $article"
    else
        log_error "Gagal stage: $article"
        exit 1
    fi
done

# Check if there are changes to commit
if git diff --staged --quiet; then
    log_info "Tidak ada perubahan untuk di-commit (artikel mungkin sudah di-commit sebelumnya)"
    exit 0
fi

# Extract article title for commit message
COMMIT_MESSAGES=()
for article in "${ARTICLES_TO_PUBLISH[@]}"; do
    # Extract title from frontmatter
    TITLE=$(grep -E "^title:" "$BLOG_DIR/$article" | head -1 | sed 's/title:[[:space:]]*"\(.*\)"/\1/' | sed "s/title:[[:space:]]*'\(.*\)'/\1/")
    if [ -n "$TITLE" ]; then
        COMMIT_MESSAGES+=("$TITLE")
    else
        COMMIT_MESSAGES+=("$article")
    fi
done

# Create commit message
COMMIT_MSG="chore(blog): publish artikel - $TODAY"
if [ ${#COMMIT_MESSAGES[@]} -eq 1 ]; then
    COMMIT_MSG="chore(blog): publish artikel - ${COMMIT_MESSAGES[0]}"
else
    COMMIT_MSG="chore(blog): publish ${#ARTICLES_TO_PUBLISH[@]} artikel - $TODAY"
fi

# Add detailed list in commit message body
COMMIT_MSG_BODY=""
for msg in "${COMMIT_MESSAGES[@]}"; do
    COMMIT_MSG_BODY+="\n- $msg"
done

# Commit
log_info "Membuat commit..."
if git commit -m "$COMMIT_MSG" -m "Artikel yang dipublish:$COMMIT_MSG_BODY"; then
    log_info "Commit berhasil dibuat"
else
    log_error "Gagal membuat commit"
    exit 1
fi

# Push to remote
log_info "Push ke remote repository..."
if git push origin "$BRANCH"; then
    log_info "Push berhasil!"
    log_info "Artikel sudah di-deploy ke production"
else
    log_error "Gagal push ke remote"
    exit 1
fi

log_info "=== Auto-deploy selesai dengan sukses ==="

