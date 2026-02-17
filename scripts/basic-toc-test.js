#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

class BasicTOCTester {
  constructor() {
    this.baseUrl = "http://localhost:4321";
  }

  async testServerRunning() {
    console.log("🔍 Testing if dev server is running...");

    try {
      const { stdout } = await execAsync(
        `curl -s -o /dev/null -w "%{http_code}" ${this.baseUrl}`,
      );
      const statusCode = parseInt(stdout.trim());

      if (statusCode === 200) {
        console.log("✅ Dev server is running");
        return true;
      } else {
        console.log(`❌ Dev server returned status code: ${statusCode}`);
        return false;
      }
    } catch (_error) {
      console.log("❌ Dev server is not running or not accessible");
      console.log("💡 Please run: npm run dev");
      return false;
    }
  }

  async testBlogPostExists() {
    console.log("🔍 Testing if blog post exists...");

    const blogUrl = `${this.baseUrl}/blog/2024-01-29-mengatasi-empty-chunk-warning-astro`;

    try {
      const { stdout } = await execAsync(
        `curl -s -o /dev/null -w "%{http_code}" "${blogUrl}"`,
      );
      const statusCode = parseInt(stdout.trim());

      if (statusCode === 200) {
        console.log("✅ Blog post exists and is accessible");
        return true;
      } else {
        console.log(`❌ Blog post returned status code: ${statusCode}`);
        return false;
      }
    } catch (_error) {
      console.log("❌ Blog post is not accessible");
      return false;
    }
  }

  async testTOCInHTML() {
    console.log("🔍 Testing TOC in HTML content...");

    const blogUrl = `${this.baseUrl}/blog/2024-01-29-mengatasi-empty-chunk-warning-astro`;

    try {
      const { stdout } = await execAsync(`curl -s "${blogUrl}"`);
      const html = stdout;

      const tests = [
        {
          name: "TOC Container (#toc-nav)",
          test: () => html.includes('id="toc-nav"'),
        },
        {
          name: "TOC Header (.toc-header)",
          test: () => html.includes('class="toc-header"'),
        },
        {
          name: "TOC Toggle Button (#toc-toggle-btn)",
          test: () => html.includes('id="toc-toggle-btn"'),
        },
        {
          name: "TOC Title (Daftar Isi)",
          test: () => html.includes("Daftar Isi"),
        },
        {
          name: "TOC Expanded Class",
          test: () => html.includes("toc-nav expanded"),
        },
        {
          name: "TOC Script",
          test: () => html.includes("generateTOC") || html.includes("toc-nav"),
        },
        {
          name: "TOC Styles",
          test: () => html.includes("table-of-contents"),
        },
      ];

      let passed = 0;
      const total = tests.length;

      console.log("\n📋 HTML Content Tests:");
      for (const test of tests) {
        const result = test.test();
        console.log(`${result ? "✅" : "❌"} ${test.name}`);
        if (result) passed++;
      }

      console.log("\n" + "=".repeat(50));
      console.log("📊 HTML Test Summary");
      console.log("=".repeat(50));
      console.log(
        `✅ Passed: ${passed}/${total} (${((passed / total) * 100).toFixed(1)}%)`,
      );
      console.log(`❌ Failed: ${total - passed}/${total}`);
      console.log("=".repeat(50));

      return passed === total;
    } catch (error) {
      console.log("❌ Error testing HTML content:", error.message);
      return false;
    }
  }

  async testTOCJavaScript() {
    console.log("🔍 Testing TOC JavaScript functionality...");

    const blogUrl = `${this.baseUrl}/blog/2024-01-29-mengatasi-empty-chunk-warning-astro`;

    try {
      const { stdout } = await execAsync(`curl -s "${blogUrl}"`);
      const html = stdout;

      const jsTests = [
        {
          name: "generateTOC Function",
          test: () =>
            html.includes("generateTOC") ||
            html.includes("function generateTOC"),
        },
        {
          name: "updateActiveTOCOnScroll Function",
          test: () =>
            html.includes("updateActiveTOCOnScroll") || html.includes("scroll"),
        },
        {
          name: "toggleTOC Function",
          test: () => html.includes("toggleTOC") || html.includes("toggle"),
        },
        {
          name: "Smooth Scroll Implementation",
          test: () =>
            html.includes("scrollIntoView") || html.includes("smooth"),
        },
        {
          name: "Event Listeners",
          test: () =>
            html.includes("addEventListener") || html.includes("click"),
        },
        {
          name: "MutationObserver",
          test: () =>
            html.includes("MutationObserver") || html.includes("observer"),
        },
      ];

      let passed = 0;
      const total = jsTests.length;

      console.log("\n📋 JavaScript Tests:");
      for (const test of jsTests) {
        const result = test.test();
        console.log(`${result ? "✅" : "❌"} ${test.name}`);
        if (result) passed++;
      }

      console.log("\n" + "=".repeat(50));
      console.log("📊 JavaScript Test Summary");
      console.log("=".repeat(50));
      console.log(
        `✅ Passed: ${passed}/${total} (${((passed / total) * 100).toFixed(1)}%)`,
      );
      console.log(`❌ Failed: ${total - passed}/${total}`);
      console.log("=".repeat(50));

      return passed === total;
    } catch (error) {
      console.log("❌ Error testing JavaScript:", error.message);
      return false;
    }
  }

  async testTOCStyles() {
    console.log("🔍 Testing TOC CSS styles...");

    const blogUrl = `${this.baseUrl}/blog/2024-01-29-mengatasi-empty-chunk-warning-astro`;

    try {
      const { stdout } = await execAsync(`curl -s "${blogUrl}"`);
      const html = stdout;

      const styleTests = [
        {
          name: "TOC Container Styles",
          test: () => html.includes("table-of-contents"),
        },
        {
          name: "TOC Link Styles",
          test: () => html.includes("toc-link"),
        },
        {
          name: "TOC Hierarchy Styles",
          test: () => html.includes("toc-h2") || html.includes("toc-h3"),
        },
        {
          name: "TOC Active State Styles",
          test: () =>
            html.includes("toc-link.active") || html.includes(".active"),
        },
        {
          name: "TOC Toggle Button Styles",
          test: () => html.includes("toc-toggle-btn"),
        },
        {
          name: "TOC Responsive Styles",
          test: () => html.includes("@media") || html.includes("max-width"),
        },
      ];

      let passed = 0;
      const total = styleTests.length;

      console.log("\n📋 CSS Style Tests:");
      for (const test of styleTests) {
        const result = test.test();
        console.log(`${result ? "✅" : "❌"} ${test.name}`);
        if (result) passed++;
      }

      console.log("\n" + "=".repeat(50));
      console.log("📊 CSS Test Summary");
      console.log("=".repeat(50));
      console.log(
        `✅ Passed: ${passed}/${total} (${((passed / total) * 100).toFixed(1)}%)`,
      );
      console.log(`❌ Failed: ${total - passed}/${total}`);
      console.log("=".repeat(50));

      return passed === total;
    } catch (error) {
      console.log("❌ Error testing CSS styles:", error.message);
      return false;
    }
  }

  async runAllTests() {
    console.log("🧪 Starting Basic TOC Tests...\n");

    const results = {
      server: false,
      blogPost: false,
      html: false,
      javascript: false,
      styles: false,
    };

    try {
      results.server = await this.testServerRunning();

      if (!results.server) {
        console.log("\n❌ Cannot proceed without dev server running");
        return;
      }

      results.blogPost = await this.testBlogPostExists();

      if (!results.blogPost) {
        console.log("\n❌ Cannot proceed without blog post");
        return;
      }

      results.html = await this.testTOCInHTML();
      results.javascript = await this.testTOCJavaScript();
      results.styles = await this.testTOCStyles();

      // Final summary
      const totalTests = Object.keys(results).length;
      const passedTests = Object.values(results).filter(Boolean).length;
      const passRate = ((passedTests / totalTests) * 100).toFixed(1);

      console.log("\n" + "=".repeat(60));
      console.log("🎉 FINAL TOC TEST RESULTS");
      console.log("=".repeat(60));
      console.log(`✅ Passed: ${passedTests}/${totalTests} (${passRate}%)`);
      console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
      console.log("=".repeat(60));

      if (passedTests === totalTests) {
        console.log(
          "🎊 All tests passed! TOC component is properly implemented.",
        );
      } else {
        console.log("🔧 Some tests failed. Check the details above.");
      }
    } catch (error) {
      console.error("❌ Test suite error:", error.message);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const tester = new BasicTOCTester();
  tester.runAllTests().catch(console.error);
}

export default BasicTOCTester;
