# konxc.space Portfolio Deployment Guide

## 📋 Overview

Portfolio website built with Astro, deployed as Docker container behind Nginx reverse proxy.

**Domains:**
- Primary: `konxc.space`
- WWW: `www.konxc.space`

**Tech Stack:**
- Framework: Astro 5.x
- Runtime: Node.js 20
- Adapter: @astrojs/node (standalone)
- Container: Docker
- Reverse Proxy: Nginx
- SSL: Let's Encrypt

## 🚀 Quick Deployment

### 1. Generate SSL Certificate (First Time Only)

```bash
cd /home/dev/web
./scripts/generate-ssl-konxc.sh
```

This will:
- Request SSL certificate from Let's Encrypt
- Configure for both `konxc.space` and `www.konxc.space`
- Enable auto-renewal

### 2. Deploy Application

```bash
cd /home/dev/web
./scripts/deploy-konxc-io.sh
```

This will:
- Build Docker image
- Start container
- Configure nginx
- Verify deployment

## 📁 File Structure

```
/home/dev/web/
├── instances/koneksi/services/konxc.github.io/
│   ├── Dockerfile                 # Docker build config
│   ├── docker-compose.yml         # Container orchestration
│   ├── .dockerignore             # Build exclusions
│   ├── package.json              # Dependencies
│   ├── astro.config.mjs          # Astro configuration
│   └── src/                      # Source code
├── infrastructure/nginx/conf.d/
│   └── konxc.space.conf          # Nginx configuration
└── scripts/
    ├── deploy-konxc-io.sh # Deployment script
    └── generate-ssl-konxc.sh     # SSL setup script
```

## 🔧 Configuration Details

### Docker Container

**Name:** `koneksi-konxc-io`
**Port:** 4321 (internal only)
**Network:** `nginx-net`
**Health Check:** HTTP GET on port 4321

### Nginx Configuration

**HTTP (Port 80):**
- Redirects to HTTPS
- Handles ACME challenges for SSL renewal

**HTTPS (Port 443):**
- Serves both `konxc.space` and `www.konxc.space`
- Proxies to `koneksi-konxc-io:4321`
- Security headers enabled
- Static asset caching (1 year)

### Environment Variables

```bash
NODE_ENV=production
HOST=0.0.0.0
PORT=4321
```

## 🛠️ Manual Operations

### Build Image

```bash
cd /home/dev/web/instances/koneksi/services/konxc.github.io
docker build -t konxc-io:latest .
```

### Start Container

```bash
docker compose up -d
```

### Stop Container

```bash
docker compose down
```

### View Logs

```bash
docker logs -f koneksi-konxc-io
```

### Restart Container

```bash
docker compose restart
```

### Rebuild and Restart

```bash
docker compose down
docker build -t konxc-io:latest .
docker compose up -d
```

## 🧪 Testing

### Test HTTP Redirect

```bash
curl -I http://konxc.space
# Should return 301 redirect to https://
```

### Test HTTPS Main Domain

```bash
curl -I https://konxc.space
# Should return 200 OK
```

### Test HTTPS WWW Subdomain

```bash
curl -I https://www.konxc.space
# Should return 200 OK
```

### Test Container Health

```bash
docker inspect koneksi-konxc-io --format='{{.State.Health.Status}}'
# Should return: healthy
```

### Test Nginx Config

```bash
docker exec nginx-proxy nginx -t
```

## 🔐 SSL Certificate Management

### Check Certificate Status

```bash
sudo certbot certificates -d konxc.space
```

### Manual Renewal

```bash
sudo certbot renew --cert-name konxc.space
docker exec nginx-proxy nginx -s reload
```

### Auto-Renewal

Certbot automatically renews certificates via systemd timer:

```bash
# Check timer status
systemctl status certbot.timer

# Test renewal (dry-run)
sudo certbot renew --dry-run
```

## 📊 Monitoring

### Container Status

```bash
docker ps --filter "name=koneksi-konxc-io"
```

### Resource Usage

```bash
docker stats koneksi-konxc-io --no-stream
```

### Nginx Logs

```bash
# Access logs
docker exec nginx-proxy tail -f /var/log/nginx/konxc.space.access.log

# Error logs
docker exec nginx-proxy tail -f /var/log/nginx/konxc.space.error.log
```

### Container Logs

```bash
# Real-time
docker logs -f koneksi-konxc-io

# Last 100 lines
docker logs --tail 100 koneksi-konxc-io
```

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs koneksi-konxc-io

# Check if port is available
docker ps | grep 4321

# Rebuild image
docker compose down
docker build --no-cache -t konxc-io:latest .
docker compose up -d
```

### SSL Certificate Issues

```bash
# Check certificate files
sudo ls -la /etc/letsencrypt/live/konxc.space/

# Regenerate certificate
./scripts/generate-ssl-konxc.sh
```

### Nginx Not Proxying

```bash
# Test nginx config
docker exec nginx-proxy nginx -t

# Reload nginx
docker exec nginx-proxy nginx -s reload

# Check nginx logs
docker logs nginx-proxy
```

### Site Not Accessible

```bash
# Check container is running
docker ps | grep koneksi-konxc-io

# Check container health
docker inspect koneksi-konxc-io --format='{{.State.Health.Status}}'

# Check nginx is running
docker ps | grep nginx-proxy

# Test from inside container
docker exec koneksi-konxc-io wget -O- http://localhost:4321
```

## 🔄 Update Workflow

### Content Updates

```bash
cd /home/dev/web/instances/koneksi/services/konxc.github.io

# Pull latest changes
git pull

# Rebuild and deploy
./scripts/deploy-konxc-io.sh
```

### Dependency Updates

```bash
cd /home/dev/web/instances/koneksi/services/konxc.github.io

# Update dependencies
pnpm update

# Test locally
pnpm run build
pnpm run preview

# Deploy
./scripts/deploy-konxc-io.sh
```

### Configuration Changes

```bash
# Edit nginx config
nano /home/dev/web/infrastructure/nginx/conf.d/konxc.space.conf

# Test config
docker exec nginx-proxy nginx -t

# Reload nginx
docker exec nginx-proxy nginx -s reload
```

## 📝 Notes

- Container runs as standalone Node.js server (not static)
- Astro SSR enabled with Node adapter
- Health checks ensure container is responding
- Static assets cached for 1 year
- Security headers enabled
- HTTP/2 enabled
- HSTS enabled with 1 year max-age

## 🆘 Support

For issues or questions:
1. Check container logs: `docker logs koneksi-konxc-io`
2. Check nginx logs: `docker exec nginx-proxy tail -f /var/log/nginx/konxc.space.error.log`
3. Verify DNS: `dig konxc.space` and `dig www.konxc.space`
4. Test SSL: `openssl s_client -connect konxc.space:443 -servername konxc.space`

## 🏗️ Advanced Hybrid Architecture (Astro + Headless WP)

**Skenario Khusus:** Deploy Frontend di Vercel/Cloudflare, dan CMS (WordPress) di Server Host Lokal (Awankinton) dengan rute `konxc.space/cms`.

Apakah bisa CMS berada di sub-direktori (`/cms`) meskipun beda server dengan Frontend? **TENTU BISA!**

Ini adalah teknik **Reverse Proxy / Rewrites** di level Edge/CDN. Berikut adalah cara kerjanya:

### 1. Konfigurasi Backend CMS (Server Awankinton)
- WordPress (Headless) di-install di server Awankinton (host ini) menggunakan Docker/Podman.
- Karena domain utama `konxc.space` akan diarahkan ke Vercel/Cloudflare, server ini harus dikonfigurasi untuk menerima *traffic* melalui IP statis atau subdomain rahasia (misal: `cms-origin.konxc.space`).
- WordPress dikonfigurasi dengan URL utama `https://konxc.space/cms`.

### 2. Konfigurasi Frontend (Vercel / Cloudflare)
Frontend Astro akan di-deploy ke Vercel atau Cloudflare. Kita akan memanipulasi *routing* di level CDN sehingga semua permintaan ke `/cms` akan dilempar (*proxied*) ke server Awankinton.

#### Opsi A: Menggunakan Vercel (Vercel Rewrites)
Jika Frontend di-deploy di Vercel, tambahkan file `vercel.json` di root direktori frontend:
```json
{
  "rewrites": [
    {
      "source": "/cms/:match*",
      "destination": "https://cms-origin.konxc.space/cms/:match*"
    }
  ]
}
```
*Catatan: Ganti `cms-origin.konxc.space` dengan IP server Awankinton atau subdomain yang menunjuk ke server ini.*

#### Opsi B: Menggunakan Cloudflare (Transform Rules / Workers)
Jika Anda menggunakan Cloudflare Pages atau mengelola DNS via Cloudflare:
1. Buat **Transform Rule / URL Rewrite** di dashboard Cloudflare untuk merutekan *traffic* dengan awalan `/cms` ke IP Server Awankinton.
2. ATAU gunakan **Cloudflare Worker** sederhana:
```javascript
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/cms')) {
      // Lempar request ke server Awankinton
      const originUrl = 'https://cms-origin.konxc.space' + url.pathname + url.search;
      return fetch(new Request(originUrl, request));
    }
    // Lanjutkan ke Cloudflare Pages (Frontend)
    return fetch(request);
  }
}
```

### Keuntungan Arsitektur Ini:
1. **SEO Maksimal:** Frontend Astro berada di Edge Network (Vercel/Cloudflare) yang membuatnya sangat cepat dan ramah SEO.
2. **Keamanan:** Server Awankinton (CMS) tidak terekspos langsung ke publik di root domain, melainkan disembunyikan di balik proteksi Vercel/Cloudflare.
3. **URL Bersih:** Pengunjung dan admin tetap melihat satu domain yang sama (`konxc.space`), tanpa perlu berurusan dengan subdomain seperti `cms.konxc.space` yang terkadang di-blokir oleh aturan CORS atau AdBlocker tertentu.
4. **Data Ownership:** Seluruh data CMS Anda dan database-nya 100% berada di server milik PT Koneksi (Awankinton Cloud), sehingga kedaulatan data terjamin.

## 📦 Development CMS (WordPress)

Lingkungan pengembangan WordPress CMS telah dipisahkan secara rapi ke direktori `konxc.space-cms` agar sesuai dengan konvensi kontainer di server host ini (Awankinton).

### Struktur Direktori CMS
```
/home/dev/web/instances/koneksi/services/konxc.space-cms/
├── docker-compose.yml   # Konfigurasi WordPress + MariaDB
├── .env                 # Kredensial Database
├── db_data/             # (Auto-generated) Data persisten MariaDB
├── wp_data/             # (Auto-generated) File WordPress & Plugin
└── .wp-cli/             # Podman wp-cli environment
```

### Menjalankan WordPress secara Lokal (Docker Compose)
Server host ini menggunakan `docker-compose` yang terhubung dengan `nginx-net` agar Nginx bisa me-routing URL dengan mulus.

1. **Masuk ke direktori CMS:**
   ```bash
   cd /home/dev/web/instances/koneksi/services/konxc.space-cms
   ```
2. **Jalankan Kontainer di Background:**
   ```bash
   docker compose up -d
   ```
3. **Cek Status Kontainer:**
   ```bash
   docker compose ps
   ```
   *Anda akan melihat kontainer `konxc-cms-wp` dan `konxc-cms-db` berjalan.*

### Menggunakan WP-CLI (via Podman/Docker)
Agar tidak mengotori *host environment* dengan instalasi PHP/WP-CLI di OS, gunakan wp-cli via kontainer:
```bash
docker compose exec wordpress wp core update --allow-root
docker compose exec wordpress wp plugin install wp-graphql --activate --allow-root
```

### Nginx Routing untuk CMS
Karena WordPress berada di jaringan `nginx-net` dan mengekspos port 80 secara internal, Anda bisa menambahkan blok pada konfigurasi Nginx (`/home/dev/web/infrastructure/nginx/conf.d/konxc.space.conf`) untuk merutekan `/cms`:
```nginx
location /cms {
    proxy_pass http://konxc-cms-wp:80;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
}
```
