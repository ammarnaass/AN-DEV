import React, { useState, useMemo } from "react";
import { useI18n } from "../../../lib/i18n";
import { Terminal, Rss, Search, BookOpen, Layers } from "lucide-react";
import { useBlogPosts } from "../hooks/useBlog";
import { FeaturedPostCard } from "../components/FeaturedPostCard";
import { PostCard } from "../components/PostCard";
import { MetaTags } from "../../../components/seo/MetaTags";

export const BlogPage: React.FC = () => {
  const { locale } = useI18n();
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { data: posts = [], isLoading } = useBlogPosts();

  const categories = [
    { id: "all", label_ar: "جميع المقالات", label_en: "All Articles" },
    { id: "architecture", label_ar: "معمارية الأنظمة", label_en: "Architecture" },
    { id: "performance", label_ar: "قواعد البيانات والأداء", label_en: "Databases & Performance" },
    { id: "security", label_ar: "الأمان والامتثال", label_en: "Security & Compliance" },
    { id: "pos_erp", label_ar: "نقاط البيع والمؤسسات", label_en: "POS & ERP Systems" },
    { id: "ai_llm", label_ar: "الذكاء الاصطناعي", label_en: "AI & Automation" },
    { id: "frontend", label_ar: "هندسة الواجهات", label_en: "Modern UI/UX" }
  ];

  // Dynamic featured post selection
  const featuredPost = useMemo(() => {
    return posts.find((p) => p.featured) || posts[0];
  }, [posts]);

  // Filtered posts
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Category filter
      if (activeCategory !== "all" && post.category !== activeCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle =
          (post.title_ar && post.title_ar.toLowerCase().includes(query)) ||
          (post.title_en && post.title_en.toLowerCase().includes(query));
        const matchesSummary =
          (post.summary_ar && post.summary_ar.toLowerCase().includes(query)) ||
          (post.summary_en && post.summary_en.toLowerCase().includes(query));
        const matchesTags =
          Array.isArray(post.tags) &&
          post.tags.some((t) => t.toLowerCase().includes(query));
        const matchesCategory = (post.category || "").toLowerCase().includes(query);
        if (!matchesTitle && !matchesSummary && !matchesTags && !matchesCategory) {
          return false;
        }
      }

      return true;
    });
  }, [posts, activeCategory, searchQuery]);

  // If there's an active filter or search, show all matching posts; otherwise exclude featured from regular grid
  const regularPosts = useMemo(() => {
    if (activeCategory !== "all" || searchQuery.trim()) {
      return filteredPosts;
    }
    return filteredPosts.filter((p) => p.id !== featuredPost?.id);
  }, [filteredPosts, activeCategory, searchQuery, featuredPost]);

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

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-surface-container border border-line px-3 py-1.5 rounded-lg text-text-muted text-xs font-mono">
                <Rss className="w-3.5 h-3.5 text-secondary" />
                <span className="text-text-primary">JSON/RSS FEED</span>
                <span className="px-1.5 py-0.5 rounded bg-surface-elevated text-secondary text-[10px] font-bold">
                  v2.5.0
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-2 font-mono text-xs text-secondary tracking-widest uppercase">
              <Terminal className="w-4 h-4" />
              <span>AN DEV Tech Journal // سجل التوثيق المعماري</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-text-primary tracking-tight">
              {locale === "ar"
                ? "المدونة الهندسية والتقنية"
                : "Engineering Journal & Architecture Notes"}
            </h1>
            <p className="text-text-muted text-sm sm:text-base leading-relaxed">
              {locale === "ar"
                ? "تحليلات معمارية عميقة، مقاييس أداء حقيقية، وأدلة عملية لتطوير منصات فائقة السرعة وقابلة للتوسع في بيئات الإنتاج."
                : "Deep architectural analyses, real benchmark telemetry, and pragmatic guides for high-performance distributed systems in production."}
            </p>
          </div>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setActiveCategory(c.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap ${
                    activeCategory === c.id
                      ? "bg-primary-container text-white shadow-[0_0_12px_rgba(13,110,253,0.35)]"
                      : "bg-surface border border-line text-text-muted hover:text-text-primary"
                  }`}
                >
                  {locale === "ar" ? c.label_ar : c.label_en}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  locale === "ar"
                    ? "بحث في المقالات والتقنيات..."
                    : "Search articles or tags..."
                }
                className="w-full px-4 py-2 pr-9 rtl:pr-4 rtl:pl-9 rounded-xl bg-surface border border-line text-xs sm:text-sm text-text-primary outline-none focus:border-secondary transition-all"
              />
              <Search className="w-4 h-4 text-text-muted absolute right-3 rtl:right-auto rtl:left-3 top-2.5 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Featured Post Card (shown when on 'all' category and no search active) */}
        {activeCategory === "all" && !searchQuery.trim() && featuredPost && (
          <FeaturedPostCard post={featuredPost} />
        )}

        {/* Posts Grid Header */}
        <div className="flex items-center justify-between pt-4 border-t border-line text-start">
          <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
            <Layers className="w-4 h-4 text-secondary" />
            <span>
              {locale === "ar"
                ? `المقالات المتاحة (${regularPosts.length})`
                : `Available Articles (${regularPosts.length})`}
            </span>
          </div>
        </div>

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-start">
          {isLoading ? (
            [1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-72 rounded-2xl border border-line bg-surface/40 animate-pulse"
              />
            ))
          ) : regularPosts.length > 0 ? (
            regularPosts.map((p) => <PostCard key={p.id} post={p} />)
          ) : (
            <div className="col-span-full py-16 text-center border border-line rounded-2xl bg-surface/30 space-y-3">
              <BookOpen className="w-10 h-10 mx-auto text-text-muted/60" />
              <p className="text-text-primary font-bold text-sm">
                {locale === "ar"
                  ? "لا توجد مقالات تقنية تطابق البحث والتصنيف المحدد."
                  : "No technical articles match the selected filter."}
              </p>
              <button
                onClick={() => {
                  setActiveCategory("all");
                  setSearchQuery("");
                }}
                className="text-xs text-secondary hover:underline font-mono"
              >
                {locale === "ar" ? "إعادة تعيين الفلاتر" : "Reset Filters"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
