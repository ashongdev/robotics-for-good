interface ScoringInfoProps {
	phase: number;
}

export function ScoringInfo({ phase }: ScoringInfoProps) {
	if (phase !== 0) return null;

	return (
		<div className="w-full border-2 border-editorial-ink bg-editorial-gold mb-8 shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]">
			<div className="px-6 py-4">
				<p className="text-[10px] font-black uppercase tracking-widest text-editorial-ink mb-3">
					📋 Scoring Format - Phase 0
				</p>
				<div className="space-y-2 text-[9px] leading-relaxed text-editorial-ink">
					<p className="font-bold">
						Winners are determined by the HIGHEST SCORE IN A SINGLE
						ROUND
					</p>
					<p>
						The team with the highest score in either Round 1 or
						Round 2 wins, regardless of total combined score. The
						best single round performance determines advancement.
					</p>
				</div>
			</div>
		</div>
	);
}
