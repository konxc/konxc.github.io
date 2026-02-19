---
title: "Simple TOC Testing - Basic Functionality Validation"
description: "Artikel sederhana untuk testing basic functionality Table of Contents dengan struktur yang mudah dipahami"
publishDate: 2024-01-30
author: "Sandikodev"
category: "testing"
tags: ["ui-testing", "toc-validation", "dom-integrity", "frontend-qa"]
featured: false
readingTime: 5
coverImage: "/images/blog/toc-simple-basic.png"
---

# Simple TOC Testing - Basic Functionality Validation

## 🎯 **Testing Overview**

Artikel sederhana ini dirancang untuk testing basic functionality Table of Contents dengan struktur yang mudah dipahami dan tidak terlalu kompleks.

---

## 🛠️ **Testing Scenarios**

### 1. **Header Detection**
- Memastikan generator TOC dapat mendeteksi H2 dan H3.
- Memastikan ID otomatis dibuat untuk setiap header.

### 2. **Navigation Link**
- Memastikan link di TOC dapat mengantar user ke header yang tepat.
- Memastikan scroll smooth berfungsi.

---

## 🏗️ **Content Structure**

### **Section 1: Basic Header**
Header ini seharusnya muncul di level 1 pada TOC.

#### **Sub-section 1.1**
Header ini seharusnya muncul sebagai child di bawah Section 1.

#### **Sub-section 1.2**
Header ini juga seharusnya muncul sebagai child di bawah Section 1.

### **Section 2: Another Basic Header**
Header kedua untuk memastikan listing berfungsi untuk banyak item.

---

## 📊 **Expected Results**

| Test Case | Expected Result |
| :--- | :--- |
| TOC Visibility | Muncul di area sidebar/content |
| List Accuracy | Menampilkan 2 item level 1 |
| Hierarchy | Menampilkan sub-item dengan indentasi |

---

## 🏁 **Conclusion**

Testing ini dianggap sukses jika semua poin di atas terpenuhi secara visual dan fungsional.
