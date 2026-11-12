import React from "react";
import {
  Sparkles,
  FolderKanban,
  MessageCircle,
  BookOpen,
  Globe,
  Code2,
  Cpu,
  Layers,
  Terminal,
  ShieldCheck,
  Send,
  Zap,
} from "lucide-react";

export const TikTokSvg = ({ className = "w-5 h-5 shrink-0" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.97-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.76 1.35-.04 2.54-.86 2.98-2.14.24-.62.31-1.28.3-1.94-.02-3.85-.01-7.7-.01-11.55.02-1.84.01-3.69.01-5.54z" />
  </svg>
);

export const ICON_MAP: Record<string, React.ReactNode> = {
  TikTok: <TikTokSvg className="w-5 h-5 shrink-0" />,
  Sparkles: <Sparkles className="w-5 h-5 shrink-0" />,
  FolderKanban: <FolderKanban className="w-5 h-5 shrink-0" />,
  MessageCircle: <MessageCircle className="w-5 h-5 shrink-0" />,
  BookOpen: <BookOpen className="w-5 h-5 shrink-0" />,
  Globe: <Globe className="w-5 h-5 shrink-0" />,
  Code2: <Code2 className="w-5 h-5 shrink-0" />,
  Cpu: <Cpu className="w-5 h-5 shrink-0" />,
  Layers: <Layers className="w-5 h-5 shrink-0" />,
  Terminal: <Terminal className="w-5 h-5 shrink-0" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5 shrink-0" />,
  Send: <Send className="w-5 h-5 shrink-0" />,
  Zap: <Zap className="w-5 h-5 shrink-0" />,
};

export const AVAILABLE_ICONS = [
  { name: "TikTok", icon: <TikTokSvg className="w-4 h-4" /> },
  { name: "Sparkles", icon: <Sparkles className="w-4 h-4" /> },
  { name: "FolderKanban", icon: <FolderKanban className="w-4 h-4" /> },
  { name: "MessageCircle", icon: <MessageCircle className="w-4 h-4" /> },
  { name: "BookOpen", icon: <BookOpen className="w-4 h-4" /> },
  { name: "Globe", icon: <Globe className="w-4 h-4" /> },
  { name: "Code2", icon: <Code2 className="w-4 h-4" /> },
  { name: "Cpu", icon: <Cpu className="w-4 h-4" /> },
  { name: "Layers", icon: <Layers className="w-4 h-4" /> },
  { name: "Terminal", icon: <Terminal className="w-4 h-4" /> },
  { name: "ShieldCheck", icon: <ShieldCheck className="w-4 h-4" /> },
  { name: "Send", icon: <Send className="w-4 h-4" /> },
  { name: "Zap", icon: <Zap className="w-4 h-4" /> },
];
