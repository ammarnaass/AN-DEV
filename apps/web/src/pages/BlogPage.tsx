import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useI18n } from "../lib/i18n";
import { apiFetch } from "../lib/api";
import { Post } from "@andev/shared";
import { Terminal, Calendar, ArrowLeft, ArrowRight, Rss, Clock } from "lucide-react";

export const BlogPage: React.FC = () => {
  const { locale, isRtl } = useI18n();
  const [activeCategory, setActiveCategory] = useState("all");

  const { data: posts = [], isLoading } = useQuery<Post[]>({
    queryKey: ["public-posts"],
    queryFn: () => apiFetch<Post[]>("/api/posts")
  });

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
        {featuredPost && (
          <div className="p-6 sm:p-10 rounded-2xl bg-surface border border-secondary/40 shadow-card relative overflow-hidden text-start group">
            <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-secondary via-primary to-transparent" />
            <div className="space-y-4 max-w-4xl">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded bg-secondary/15 border border-secondary/30 text-secondary font-mono text-xs font-bold uppercase">
                  {locale === "ar" ? "دراسة حالة معمارية مميزة // FEATURED" : "Featured Case Study"}
                </span>
                <span className="text-xs font-mono text-text-muted flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  <span>8 min read</span>
                </span>
              </div>

              <Link to={`/blog/${featuredPost.slug}`}>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary group-hover:text-secondary transition-colors leading-snug">
                  {locale === "ar" ? featuredPost.title_ar : featuredPost.title_en}
                </h2>
              </Link>

              <p className="text-text-muted text-sm sm:text-base leading-relaxed line-clamp-3">
                {locale === "ar"
                  ? "كيف نجحنا في استبدال خادم قواعد البيانات الخارجي بقاعدة بيانات SQLite مدمجة بنمط Write-Ahead Log ومزامنة Litestream، مما خفض زمن استجابة الـ API من 140ms إلى أقل من 25ms مع توفير 80% من تكاليف الخوادم."
                  : "How we replaced external database overhead with embedded SQLite WAL mode and Litestream live replication, slashing latency to under 25ms while trimming 80% infrastructure overhead."}
              </p>

              <div className="pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  <span>{featuredPost.published_at ? new Date(featuredPost.published_at).toLocaleDateString(locale === "ar" ? "ar-DZ" : "en-US") : "2026-11-07"}</span>
                </div>
                <Link
                  to={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-secondary group-hover:underline"
                >
                  <span>{locale === "ar" ? "قراءة التحليل المعماري كاملاً" : "Read Full Analysis"}</span>
                  {isRtl ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-start">
          {isLoading ? (
            [1, 2].map(i => (
              <div key={i} className="h-48 rounded-xl border border-line bg-surface/40 animate-pulse" />
            ))
          ) : regularPosts.map(p => {
            const title = locale === "ar" ? p.title_ar : p.title_en;
            return (
              <article
                key={p.id}
                className="p-6 rounded-xl bg-surface border border-line hover:border-secondary/40 transition-all shadow-sm flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
                    <Calendar className="w-3.5 h-3.5 text-secondary" />
                    <span>{p.published_at ? new Date(p.published_at).toLocaleDateString(locale === "ar" ? "ar-DZ" : "en-US") : "2026-11-07"}</span>
                  </div>

                  <Link to={`/blog/${p.slug}`}>
                    <h3 className="text-lg sm:text-xl font-bold text-text-primary group-hover:text-secondary transition-colors line-clamp-2">
                      {title}
                    </h3>
                  </Link>

                  <p className="text-text-muted text-xs sm:text-sm line-clamp-2 leading-relaxed">
                    {p.body_md_ar ? p.body_md_ar.replace(/[#*`_]/g, "").slice(0, 150) : ""}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-line flex items-center justify-between text-xs font-semibold text-secondary">
                  <span>{locale === "ar" ? "قراءة المقال" : "Read Article"}</span>
                  {isRtl ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
};
