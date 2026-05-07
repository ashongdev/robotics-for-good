import { motion } from "motion/react";

interface MatchNodeProps {
	match: {
		id: string;
		team1: string;
		team2: string;
		score1: number | null;
		score2: number | null;
		winner: number | null;
		station: string;
		isBye?: boolean;
	};
	onClick: () => void;
}

export function MatchNode({ match, onClick }: MatchNodeProps) {
	return (
		<motion.div
			whileHover={{ x: 4, y: 4 }}
			whileTap={{ scale: 0.98 }}
			onClick={onClick}
			className="w-full border-2 border-editorial-ink bg-white shadow-[8px_8px_0px_0px_rgba(26,26,26,1)] overflow-hidden cursor-pointer active:shadow-none transition-shadow h-full"
		>
			<div className="flex justify-between items-center px-4 py-2 border-b-2 border-editorial-ink bg-slate-50">
				<span className="text-[10px] font-black uppercase tracking-[0.2em] text-editorial-gold">
					STAGE
				</span>
				<span className="font-mono text-[10px] font-bold py-0.5 px-2 border border-editorial-ink">
					STATION {match.station}
				</span>
			</div>
			<div className="p-6 space-y-5">
				<div
					className={`flex justify-between items-center ${match.winner === 0 ? "opacity-100" : match.winner === 1 ? "opacity-30" : "opacity-100"}`}
				>
					<span className="font-serif text-2xl font-black italic tracking-tight leading-tight">
						{match.team1}
					</span>
					<span className="font-mono text-xl font-black">
						{match.score1 ?? "--"}
					</span>
				</div>
				<div className="flex items-center gap-4 py-2">
					<div className="h-[2px] flex-1 bg-editorial-ink" />
					<span className="text-[11px] font-black italic text-editorial-gold">
						VS
					</span>
					<div className="h-[2px] flex-1 bg-editorial-ink" />
				</div>
				<div
					className={`flex justify-between items-center ${match.winner === 1 ? "opacity-100" : match.winner === 0 ? "opacity-30" : "opacity-100"}`}
				>
					<span className="font-serif text-2xl font-black italic tracking-tight leading-tight">
						{match.team2}
					</span>
					<span className="font-mono text-xl font-black">
						{match.score2 ?? "--"}
					</span>
				</div>
			</div>
		</motion.div>
	);
}
