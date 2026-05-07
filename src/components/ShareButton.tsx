import { Check, Share2 } from "lucide-react";

interface ShareButtonProps {
	match: {
		team1: string;
		team2: string;
		team1Score: number | null;
		team2Score: number | null;
		station: string;
	};
	currentPhase: number;
	shared: boolean;
	onShare: () => void;
}

export function ShareButton({
	match,
	currentPhase,
	shared,
	onShare,
}: ShareButtonProps) {
	return (
		<button
			onClick={onShare}
			className="w-full mb-12 py-3 border-2 border-editorial-ink font-black text-[10px] uppercase tracking-[0.4em] flex items-center justify-center gap-3 bg-white hover:bg-editorial-gold transition-colors shadow-[4px_4px_0px_0px_rgba(26,26,26,1)] active:translate-y-1 active:shadow-none"
		>
			{shared ? (
				<Check size={14} className="text-editorial-green" />
			) : (
				<Share2 size={14} />
			)}
			{shared ? "Protocol Copied" : "Share Field Report"}
		</button>
	);
}
