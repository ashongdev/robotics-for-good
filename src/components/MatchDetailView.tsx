import { motion } from "motion/react";
import { InteractionMatrix } from "./InteractionMatrix";
import { MatchDetailHeader } from "./MatchDetailHeader";
import { Effect, ParticleEffects } from "./ParticleEffects";
import { ScoreboardDetail } from "./ScoreboardDetail";
import { ScoringInfo } from "./ScoringInfo";
import { ShareButton } from "./ShareButton";

interface Match {
	id: string;
	team1: string;
	team2: string;
	score1: number | null;
	score2: number | null;
	team1_r1: number | null;
	team1_r2: number | null;
	team2_r1: number | null;
	team2_r2: number | null;
	winner?: number | null;
	station: string;
	stage?: string;
	isBye?: boolean;
}

interface MatchDetailViewProps {
	match: Match;
	currentPhase: number;
	shared: boolean;
	effects: Effect[];
	onBack: () => void;
	onShare: () => void;
	onCheerLeft: () => void;
	onBooLeft: () => void;
	onCheerRight: () => void;
	onBooRight: () => void;
}

export function MatchDetailView({
	match,
	currentPhase,
	shared,
	effects,
	onBack,
	onShare,
	onCheerLeft,
	onBooLeft,
	onCheerRight,
	onBooRight,
}: MatchDetailViewProps) {
	return (
		<motion.div
			key="detail"
			initial={{ opacity: 0, x: 50 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -50 }}
			className="w-full flex flex-col items-center max-w-2xl"
		>
			<MatchDetailHeader onBack={onBack} />
			<ScoringInfo phase={currentPhase} />
			<ScoreboardDetail match={match} />
			<ShareButton
				match={match}
				currentPhase={currentPhase}
				shared={shared}
				onShare={onShare}
			/>
			<InteractionMatrix
				match={match}
				onCheerLeft={onCheerLeft}
				onBooLeft={onBooLeft}
				onCheerRight={onCheerRight}
				onBooRight={onBooRight}
			/>
			<ParticleEffects effects={effects} />
		</motion.div>
	);
}
