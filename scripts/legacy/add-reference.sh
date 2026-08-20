#!/bin/bash

# Script untuk menambahkan @reference ke semua file .astro yang menggunakan @apply

# Daftar file yang menggunakan @apply
files=(
  "./src/pages/test-avatars.astro"
  "./src/pages/contributors/[slug].astro"
  "./src/pages/contributors/index.astro"
  "./src/pages/header-demo.astro"
  "./src/components/blog/PerformanceOptimizer.astro"
  "./src/components/blog/AuthorProfiles.astro"
  "./src/components/blog/LikeButton.astro"
  "./src/components/blog/InlineLikeButton.astro"
  "./src/components/blog/AnalyticsDashboard.astro"
  "./src/components/blog/EnhancedCodeBlock.astro"
  "./src/components/blog/PostsGrid.astro"
  "./src/components/blog/TagCloud.astro"
  "./src/components/blog/InteractiveDemos.astro"
  "./src/components/blog/SocialShare.astro"
  "./src/components/blog/AdvancedSearch.astro"
  "./src/components/blog/ReadingMode.astro"
  "./src/components/blog/BlogHero.astro"
  "./src/components/blog/SmartBlogTestingSuite.astro"
  "./src/components/blog/AutoInlineLikeButton.astro"
  "./src/components/blog/DarkModeToggle.astro"
  "./src/components/blog/CodeBlock.astro"
  "./src/components/blog/PopularPosts.astro"
  "./src/components/blog/CodeBlockEnhancer.astro"
  "./src/components/blog/CommentsSystem.astro"
  "./src/components/blog/ArticleLikeSection.astro"
  "./src/components/blog/CategoryFilter.astro"
  "./src/components/blog/TableOfContents.astro"
  "./src/components/blog/ArticleSeries.astro"
  "./src/components/blog/ReadingProgress.astro"
  "./src/components/blog/NewsletterSignup.astro"
  "./src/components/blog/CopyPageMenu.astro"
  "./src/components/blog/NewsletterSection.astro"
  "./src/components/blog/BlogSearch.astro"
  "./src/components/blog/ReadingAnalytics.astro"
  "./src/components/blog/FeaturedPost.astro"
  "./src/components/MainLayout.astro"
  "./src/components/ui/Logo.astro"
  "./src/components/ui/Footer.astro"
  "./src/components/ui/Header.astro"
  "./src/components/ui/SimpleHeader.astro"
  "./src/components/ui/SimpleFooter.astro"
  "./src/components/ui/MinimalFooter.astro"
  "./src/components/ui/MinimalHeader.astro"
  "./src/components/ui/Avatar.astro"
  "./src/components/contributors/ContributorStats.astro"
  "./src/components/contributors/ContentRecommendations.astro"
  "./src/components/contributors/ContributorCard.astro"
  "./src/components/contributors/ProjectShowcase.astro"
  "./src/components/contributors/WritersStats.astro"
)

echo "Menambahkan @reference ke ${#files[@]} file..."

for file in "${files[@]}"; do
  if [ -f "$file" ]; then
    echo "Memproses: $file"
    
    # Cek apakah file sudah memiliki @reference
    if grep -q "@reference" "$file"; then
      echo "  ✓ Sudah memiliki @reference, dilewati"
      continue
    fi
    
    # Cek apakah file memiliki <style> block dengan @apply
    if grep -A20 "<style>" "$file" | grep -q "@apply"; then
      # Buat backup
      cp "$file" "$file.backup"
      
      # Tambahkan @reference setelah <style>
      sed -i '/<style>/a\  @reference "../styles/global.css";' "$file"
      
      echo "  ✓ @reference ditambahkan"
    else
      echo "  - Tidak ada @apply dalam <style> block"
    fi
  else
    echo "  ✗ File tidak ditemukan: $file"
  fi
done

echo "Selesai! Backup file tersimpan dengan ekstensi .backup"
