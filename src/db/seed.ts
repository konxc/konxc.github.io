import { users, posts, profiles } from "./schema";

import { db } from "./index";

async function seed() {
  console.log("🌱 Menjalankan seeding data feed...");

  // 1. Bersihkan data lama (Urutan diperhatikan karena foreign keys)
  try {
    await db.delete(profiles);
    await db.delete(posts);
    await db.delete(users);
  } catch {
    console.log("⚠️  Pembersihan gagal (mungkin tabel kosong), melanjutkan...");
  }

  // 2. Data Users & Profiles
  const seedUsers = [
    {
      id: "user_1",
      name: "Warung Kopi Senja",
      email: "senja@konxc.example.com",
      tagline: "Bisnis Owner & Penggiat Literasi",
    },
    {
      id: "user_2",
      name: "Tech Enthusiast @ Koneksi",
      email: "tech@konxc.example.com",
      tagline: "Praktisi Web3 & Educator",
    },
    {
      id: "user_3",
      name: "Investasi Maju",
      email: "invest@konxc.example.com",
      tagline: "Analis Investasi Digital",
    },
  ];

  for (const u of seedUsers) {
    await db.insert(users).values({
      id: u.id,
      name: u.name,
      email: u.email,
      emailVerified: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await db.insert(profiles).values({
      id: `profile_${u.id}`,
      userId: u.id,
      tagline: u.tagline,
    });
  }

  // 3. Data Feed Posts (Menyalin konten mentah tanpa perubahan dari mockup Feed.tsx)
  const seedPosts = [
    {
      id: "post_1",
      userId: "user_1",
      likes: 12,
      content: `Baru saja mulai mengadopsi sistem **POS berbasis SaaS** untuk kelola stok. Jauh lebih praktis daripada manual!

Kami kalkulasi penghematan waktu operasional menggunakan rumus sederhana:

$$T_{saved} = \\frac{N_{items} \\times t_{manual}}{t_{pos}} - 1$$

Di mana $N_{items}$ adalah jumlah SKU, $t_{manual}$ waktu input manual, dan $t_{pos}$ waktu pakai POS.

> "Digitalisasi bukan pilihan — ini keharusan bagi UMKM yang ingin bertahan di era ini."

Ada rekomendasi plugin untuk tracking **loyalty member**? ☕ #DigitalTransformasi #UMKM #SaaS`,
    },
    {
      id: "post_2",
      userId: "user_2",
      likes: 28,
      content: `Workshop hari ini: Bagaimana UMKM masuk ke ekosistem **Web3** via smart contract sederhana. 🚀

Contoh kontrak loyalitas di Solidity:

\`\`\`solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LoyaltyPoints {
    mapping(address => uint256) public points;
    address public owner;

    constructor() { owner = msg.sender; }

    function reward(address customer, uint256 pts) external {
        require(msg.sender == owner, "Unauthorized");
        points[customer] += pts;
    }
}
\`\`\`

Alur onboarding member baru:

\`\`\`mermaid
flowchart LR
    A[Customer Beli] --> B{Punya Wallet}
    B -->|Ya| C[Tambah Poin]
    B -->|Tidak| D[Buat Wallet]
    D --> C
    C --> E[Redeem Reward]
\`\`\`

#Web3 #Blockchain #KoneksiCloud #UMKM`,
    },
    {
      id: "post_3",
      userId: "user_3",
      likes: 15,
      content: `Pentingnya **diversifikasi aset** bagi pemilik usaha. Mari bandingkan instrumen:

| Aset | Risiko | Return | Likuiditas |
|------|--------|--------|-----------|
| Deposito | Rendah | 4–5% | Rendah |
| Reksa Dana | Sedang | 8–12% | Sedang |
| Saham | Tinggi | 15–20% | Tinggi |
| Kripto | Sangat Tinggi | >20% | Sangat Tinggi |

Formula **Sharpe Ratio** untuk evaluasi portofolio:

$$S = \\frac{R_p - R_f}{\\sigma_p}$$

Di mana $R_p$ = return portofolio, $R_f$ = risk-free rate, $\\sigma_p$ = standar deviasi.

Proporsi ideal untuk UMKM pemula:

\`\`\`mermaid
pie showData title Alokasi Aset UMKM
    "Deposito" : 40
    "Reksa Dana" : 35
    "Saham" : 20
    "Kripto" : 5
\`\`\`

📈 #Investasi #FinancialFreedom #LiterasiKeuangan`,
    },
  ];

  for (const p of seedPosts) {
    await db.insert(posts).values({
      id: p.id,
      userId: p.userId,
      content: p.content,
      likesCount: p.likes,
      // created_at and updated_at will use default (unixepoch())
    });
  }

  console.log("✅ Seeding selesai! Data feed sudah sesuai mockup.");
}

seed().catch((err) => {
  console.error("❌ Seeding gagal:", err);
  process.exit(1);
});
