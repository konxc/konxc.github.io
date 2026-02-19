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
./scripts/deploy-konxc-portfolio.sh
```

This will:
- Build Docker image
- Start container
- Configure nginx
- Verify deployment

## 📁 File Structure

```
/home/dev/web/
├── instances/koneksi/services/portfolio/
│   ├── Dockerfile                 # Docker build config
│   ├── docker-compose.yml         # Container orchestration
│   ├── .dockerignore             # Build exclusions
│   ├── package.json              # Dependencies
│   ├── astro.config.mjs          # Astro configuration
│   └── src/                      # Source code
├── infrastructure/nginx/conf.d/
│   └── konxc.space.conf          # Nginx configuration
└── scripts/
    ├── deploy-konxc-portfolio.sh # Deployment script
    └── generate-ssl-konxc.sh     # SSL setup script
```

## 🔧 Configuration Details

### Docker Container

**Name:** `koneksi-portfolio`
**Port:** 4321 (internal only)
**Network:** `nginx-net`
**Health Check:** HTTP GET on port 4321

### Nginx Configuration

**HTTP (Port 80):**
- Redirects to HTTPS
- Handles ACME challenges for SSL renewal

**HTTPS (Port 443):**
- Serves both `konxc.space` and `www.konxc.space`
- Proxies to `koneksi-portfolio:4321`
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
cd /home/dev/web/instances/koneksi/services/portfolio
docker build -t konxc-portfolio:latest .
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
docker logs -f koneksi-portfolio
```

### Restart Container

```bash
docker compose restart
```

### Rebuild and Restart

```bash
docker compose down
docker build -t konxc-portfolio:latest .
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
docker inspect koneksi-portfolio --format='{{.State.Health.Status}}'
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
docker ps --filter "name=koneksi-portfolio"
```

### Resource Usage

```bash
docker stats koneksi-portfolio --no-stream
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
docker logs -f koneksi-portfolio

# Last 100 lines
docker logs --tail 100 koneksi-portfolio
```

## 🐛 Troubleshooting

### Container Won't Start

```bash
# Check logs
docker logs koneksi-portfolio

# Check if port is available
docker ps | grep 4321

# Rebuild image
docker compose down
docker build --no-cache -t konxc-portfolio:latest .
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
docker ps | grep koneksi-portfolio

# Check container health
docker inspect koneksi-portfolio --format='{{.State.Health.Status}}'

# Check nginx is running
docker ps | grep nginx-proxy

# Test from inside container
docker exec koneksi-portfolio wget -O- http://localhost:4321
```

## 🔄 Update Workflow

### Content Updates

```bash
cd /home/dev/web/instances/koneksi/services/portfolio

# Pull latest changes
git pull

# Rebuild and deploy
./scripts/deploy-konxc-portfolio.sh
```

### Dependency Updates

```bash
cd /home/dev/web/instances/koneksi/services/portfolio

# Update dependencies
pnpm update

# Test locally
pnpm run build
pnpm run preview

# Deploy
./scripts/deploy-konxc-portfolio.sh
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
1. Check container logs: `docker logs koneksi-portfolio`
2. Check nginx logs: `docker exec nginx-proxy tail -f /var/log/nginx/konxc.space.error.log`
3. Verify DNS: `dig konxc.space` and `dig www.konxc.space`
4. Test SSL: `openssl s_client -connect konxc.space:443 -servername konxc.space`
