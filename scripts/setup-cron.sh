#!/bin/bash

# Script untuk setup cron job auto-deploy artikel
# Menjalankan script setiap Rabu dan Jumat jam 09:00 WIB (UTC+7 = 02:00 UTC)

SCRIPT_DIR="/home/dev/web/koneksi/konxc.github.io/scripts"
DEPLOY_SCRIPT="$SCRIPT_DIR/auto-deploy-article.sh"
CRON_LOG="$SCRIPT_DIR/../logs/cron.log"

echo "=== Setup Cron Job untuk Auto-Deploy Artikel ==="
echo ""

# Check if script exists
if [ ! -f "$DEPLOY_SCRIPT" ]; then
    echo "Error: Script tidak ditemukan: $DEPLOY_SCRIPT"
    exit 1
fi

# Make script executable
chmod +x "$DEPLOY_SCRIPT"

# Create log directory
mkdir -p "$(dirname "$CRON_LOG")"

# Cron job: Run every Wednesday and Friday at 09:00 WIB (02:00 UTC)
# Format: minute hour day month weekday command
# 0 2 * * 3,5 = Every Wednesday (3) and Friday (5) at 02:00 UTC (09:00 WIB)
CRON_SCHEDULE="0 2 * * 3,5"

# Cron command with logging
CRON_CMD="$DEPLOY_SCRIPT >> $CRON_LOG 2>&1"

# Check if cron job already exists
CRON_TMP=$(mktemp)
crontab -l 2>/dev/null > "$CRON_TMP" || true

if grep -q "auto-deploy-article.sh" "$CRON_TMP"; then
    echo "⚠️  Cron job sudah ada!"
    echo ""
    echo "Cron job saat ini:"
    grep "auto-deploy-article.sh" "$CRON_TMP"
    echo ""
    read -p "Apakah Anda ingin mengganti cron job yang ada? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "Dibatalkan."
        rm "$CRON_TMP"
        exit 0
    fi
    # Remove old cron job
    grep -v "auto-deploy-article.sh" "$CRON_TMP" > "${CRON_TMP}.new" || true
    mv "${CRON_TMP}.new" "$CRON_TMP"
fi

# Add new cron job
echo "$CRON_SCHEDULE $CRON_CMD" >> "$CRON_TMP"
crontab "$CRON_TMP"
rm "$CRON_TMP"

echo "✅ Cron job berhasil ditambahkan!"
echo ""
echo "Jadwal: Setiap Rabu dan Jumat jam 09:00 WIB"
echo "Command: $CRON_CMD"
echo ""
echo "Untuk melihat cron jobs yang aktif:"
echo "  crontab -l"
echo ""
echo "Untuk menghapus cron job:"
echo "  crontab -e  # Edit dan hapus line yang sesuai"
echo ""
echo "Log akan tersimpan di: $CRON_LOG"

