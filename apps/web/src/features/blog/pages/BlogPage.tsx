import React, { useState } from "react";
import { useI18n } from "../../../lib/i18n";
import { Terminal, Rss } from "lucide-react";
import { useBlogPosts } from "../hooks/useBlog";
import { FeaturedPostCard } from "../components/FeaturedPostCard";
import { PostCard } from "../components/PostCard";
import { MetaTags } from "../../../components/seo/MetaTags";

export const BlogPage: React.FC = () => {
  const { locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState("all");
  const { data: posts = [], isLoading } = useBlogPosts();

  const categories = [
    { id: "all", label_ar: "جميع المقالات", label_en: "All Articles" },
    { id: "arch", label_ar: "معمارية الأنظمة", label_en: "Architecture" },
    { id: "db", label_ar: "الأداء وقواعد البيانات", label_en: "Databases & Performance" },
    { id: "fintech", label_ar: "الدفع والتجارة (FinTech)", label_en: "FinTech & Payments" }
  ];

  const featuredPost = posts.find(p => p.slug.includes("sqlite")) || posts[0];
  const regularPosts = posts.filter(p => p.id !== featuredPost?.id);

  return (
    <div className="w-full pt-24 sm:pt-28 pb-20 bg-background overflow-hidden">
      <MetaTags
        title={locale === "ar" ? "المدونة الهندسية والتقنية" : "Engineering & Tech Blog"}
        description={
          locale === "ar"
            ? "مقالات وتحليلات برمجية معمقة في تطوير البرمجيات السحابية، أمن الأنظمة، وهندسة قواعد البيانات من فريق AN DEV."
            : "In-depth technical articles on cloud systems, database engineering, and high-performance software."
        }
        url="/blog"
      />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Ambient Glows */}
        <div className="absolute -top-40 right-1/4 w-96 h-96 rounded-full bg-secondary/10 blur-[130px] pointer-events-none" />
        <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] rounded-full bg-primary/10 blur-[150px] pointer-events-none" />

        {/* Header Signals & Monogram */}
        <div className="flex flex-col gap-6 text-start">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5 bg-surface border border-line px-4 py-1.5 rounded-full shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-status-ok animate-ping" />
              <span className="font-mono text-xs text-secondary font-bold">
                SYS_JOURNAL // REGISTRY 2026
              </span>
              <span className="font-mono text-xs text-text-muted">
                · DZ-ALGIERS CLUSTER
              </span>
            </div>

            <div className="flex items-center gap-2 bg-surface-container border border-line px-3 py-1.5 rounded-lg text-text-muted text-xs font-mono">
              <Rss className="w-3.5 h-3.5 text-secondary" />
              <span className="text-text-primary">JSON/RSS FEED</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-elevated text-secondary text-[10px] font-bold">
                v2.5.0
              </span>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs text-secondary tracking-widest uppercase">
              <Terminal className="w-4 h-4" />
              <span>AN DEV Tech Journal // سجل التوثيق المعماري</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
              {locale === "ar" ? "المدونة الهندسية والتقنية" : "Engineering Journal & Architecture Notes"}
            </h1>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              {locale === "ar"
                ? "تحليلات معمارية عميقة، مقاييس أداء حقيقية، وأدلة عملية لتطوير منصات فائقة السرعة وقابلة للتوسع في بيئات الإنتاج."
                : "Deep architectural analyses, real benchmark telemetry, and pragmatic guides for high-performance distributed systems in production."}
            </p>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 pb-2 border-b border-line">
          {categories.map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === c.id
                  ? "bg-primary-container text-white shadow-[0_0_12px_rgba(13,110,253,0.35)]"
                  : "bg-surface border border-line text-text-muted hover:text-text-primary"
              }`}
            >
              {locale === "ar" ? c.label_ar : c.label_en}
            </button>
          ))}
        </div>

        {/* Featured Post Card */}
        {featuredPost && <FeaturedPostCard post={featuredPost} />}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
          {isLoading ? (
            [1, 2].map(i => (
              <div key={i} className="h-48 rounded-xl border border-line bg-surface/40 animate-pulse" />
            ))
          ) : (
            regularPosts.map(p => <PostCard key={p.id} post={p} />)
          )}
        </div>
      </div>
    </div>
  );
};

