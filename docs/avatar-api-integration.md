# Avatar API Integration

## Masalah yang Diselesaikan

Sebelumnya, aplikasi mengalami error 404 untuk avatar yang tidak ada:
```
23:17:55 [404] /avatars/sarah-wijaya.jpg 0ms
23:17:55 [404] /avatars/ahmad-rizki.jpg 0ms
23:17:55 [404] /avatars/budi-santoso.jpg 0ms
```

## Solusi yang Diimplementasikan

### 1. **Komponen Avatar Baru**
Dibuat komponen `@components/ui/Avatar.astro` yang menggunakan API avatar sebagai fallback.

### 2. **API Avatar yang Didukung**

#### **UI Avatars** (Default)
- **URL**: `https://ui-avatars.com/api/`
- **Format**: `https://ui-avatars.com/api/?name=John+Doe&size=200&background=random&color=fff&format=png`
- **Keunggulan**: 
  - Mudah digunakan
  - Mendukung custom background dan text color
  - Format PNG dan SVG
  - Gratis tanpa limit

#### **DiceBear Avatars**
- **URL**: `https://api.dicebear.com/7.x/avataaars/svg`
- **Format**: `https://api.dicebear.com/7.x/avataaars/svg?seed=JohnDoe&size=200`
- **Keunggulan**:
  - Avatar ilustrasi yang menarik
  - Banyak style (avataaars, personas, bottts, dll)
  - Konsisten untuk nama yang sama

#### **Robohash**
- **URL**: `https://robohash.org/`
- **Format**: `https://robohash.org/JohnDoe?set=set1&size=200x200`
- **Keunggulan**:
  - Avatar robot yang unik
  - Banyak set karakter
  - Konsisten untuk nama yang sama

#### **Gravatar**
- **URL**: `https://www.gravatar.com/avatar/`
- **Format**: `https://www.gravatar.com/avatar/{hash}?d=identicon&s=200`
- **Keunggulan**:
  - Berbasis email
  - Mendukung berbagai fallback (identicon, monsterid, dll)

### 3. **Implementasi di Komponen**

#### **WriterCard.astro**
```astro
<Avatar 
  name={data.name}
  email={data.github ? `${data.name.toLowerCase().replace(/\s+/g, '.')}@github.com` : undefined}
  size={64}
  src={data.avatar}
  fallbackType="ui-avatars"
  backgroundColor="random"
  class="flex-shrink-0"
/>
```

#### **ContributorCard.astro**
```astro
<Avatar 
  name={data.name}
  email={data.github ? `${data.name.toLowerCase().replace(/\s+/g, '.')}@github.com` : undefined}
  size={64}
  src={data.avatar}
  fallbackType="ui-avatars"
  backgroundColor="random"
  class="avatar-image"
/>
```

### 4. **Props Avatar Component**

```typescript
interface Props {
  name: string;                    // Nama untuk generate avatar
  email?: string;                   // Email untuk Gravatar
  size?: number;                    // Ukuran avatar (default: 200)
  class?: string;                   // CSS class tambahan
  src?: string;                     // URL avatar custom
  fallbackType?: 'ui-avatars' | 'dicebear' | 'robohash' | 'gravatar';
  backgroundColor?: string;          // Background color untuk UI Avatars
  textColor?: string;               // Text color untuk UI Avatars
}
```

### 5. **Cara Kerja Fallback**

1. **Jika `src` ada**: Coba load gambar dari URL tersebut
2. **Jika `src` gagal atau tidak ada**: Gunakan API avatar berdasarkan `fallbackType`
3. **Generate URL**: Berdasarkan nama atau email
4. **Display**: Tampilkan avatar yang berhasil di-load

### 6. **Contoh URL yang Dihasilkan**

#### **UI Avatars**
- `https://ui-avatars.com/api/?name=Ahmad+Rizki&size=64&background=random&color=fff&format=png`
- `https://ui-avatars.com/api/?name=Sarah+Wijaya&size=64&background=0D8ABC&color=fff&format=png`

#### **DiceBear**
- `https://api.dicebear.com/7.x/avataaars/svg?seed=AhmadRizki&size=64`
- `https://api.dicebear.com/7.x/personas/svg?seed=SarahWijaya&size=64`

#### **Robohash**
- `https://robohash.org/AhmadRizki?set=set1&size=64x64`
- `https://robohash.org/SarahWijaya?set=set2&size=64x64`

## Keuntungan Implementasi

### 1. **Tidak Ada Lagi 404 Error**
- Semua avatar akan memiliki fallback
- Tidak ada gambar yang gagal load

### 2. **Konsistensi Visual**
- Avatar yang konsisten untuk nama yang sama
- Tampilan yang profesional

### 3. **Fleksibilitas**
- Bisa menggunakan berbagai API avatar
- Mudah untuk di-customize

### 4. **Performance**
- Avatar di-generate secara real-time
- Tidak perlu menyimpan file avatar

### 5. **Scalability**
- Tidak perlu mengelola file avatar
- Mudah untuk menambah user baru

## Penggunaan di Komponen Lain

Untuk menggunakan Avatar component di komponen lain:

```astro
---
import Avatar from '@components/ui/Avatar.astro';
---

<Avatar 
  name="John Doe"
  size={100}
  fallbackType="dicebear"
  backgroundColor="0D8ABC"
  textColor="fff"
/>
```

## Konfigurasi Default

- **Fallback Type**: `ui-avatars`
- **Background**: `random`
- **Text Color**: `fff`
- **Size**: `200px`
- **Format**: `png`

## Testing

Untuk test berbagai API avatar:

1. **UI Avatars**: `https://ui-avatars.com/api/?name=Test+User&size=200&background=random`
2. **DiceBear**: `https://api.dicebear.com/7.x/avataaars/svg?seed=TestUser`
3. **Robohash**: `https://robohash.org/TestUser?set=set1&size=200x200`
4. **Gravatar**: `https://www.gravatar.com/avatar/placeholder?d=identicon&s=200`
