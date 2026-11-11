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

export const ICON_MAP: Record<string, React.ReactNode> = {
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
