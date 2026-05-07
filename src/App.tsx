import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useMemo, useState } from "react";
import { BracketList } from "./components/BracketList";
import { CategoryToggle } from "./components/CategoryToggle";
import { InfoModal } from "./components/InfoModal";
import { MatchDetailView } from "./components/MatchDetailView";
import { PhaseNavigation } from "./components/PhaseNavigation";
import { useEffects } from "./hooks/useEffects";
import type { Match } from "./lib/matchService";
import { transformSheetDataToMatches } from "./lib/matchService";

interface BracketPhase {
	phaseName: string;
	junior: Match[];
	senior: Match[];
}

export default function App() {
	const [currentPhase, setCurrentPhase] = useState(0);
	const [category, setCategory] = useState<"junior" | "senior">("junior");
	const [selectedMatch, setSelectedMatch] = useState<any>(null);
	const [shared, setShared] = useState(false);
	const [isInfoOpen, setIsInfoOpen] = useState(false);
	const { effects, triggerEffect } = useEffects();

	const PHASES = [
		{ phase: 0, sheetName: "PHASE_0", phaseName: "00 / INITIAL SEEDING" },
		{ phase: 1, sheetName: "PHASE_1", phaseName: "01 / SEMI FINALS" },
		{ phase: 2, sheetName: "PHASE_2", phaseName: "02 / CHAMPIONSHIP" },
		{ phase: 3, sheetName: "PHASE_3", phaseName: "03 / SPECIAL" },
	];
	const phase = PHASES[currentPhase];

	const fetchData = async () => {
		if (!phase) return { junior: [], senior: [] };

		const response = new Promise<{
			junior: string[][];
			senior: string[][];
		}>((resolve, reject) => {
			gapi.load("client", () => {
				gapi.client
					.init({
						apiKey: import.meta.env.VITE_GOOGLE_API_KEY,
						discoveryDocs: [
							"https://sheets.googleapis.com/$discovery/rest?version=v4",
						],
					})
					.then(() => {
						// Fetch both junior and senior divisions
						return Promise.all([
							(gapi.client as any).sheets.spreadsheets.values.get(
								{
									spreadsheetId: import.meta.env
										.VITE_SPREADSHEET_ID,
									range: `${phase.sheetName}!A2:I100`,
									valueRenderOption: "FORMATTED_VALUE",
								},
							),
						]);
					})
					.then((responses: any[]) => {
						const sheetData = responses[0]?.result?.values || [];
						// For now, treat all data as junior division
						// In a real scenario, you might have separate sheets or columns
						resolve({
							junior: sheetData,
							senior: sheetData,
						});
					})
					.catch((err: any) => reject(err));
			});
		});

		return response;
	};

	const query = useQuery({
		queryKey: ["scores", currentPhase],
		queryFn: fetchData,
		enabled: true,
		refetchInterval: 60000,
		refetchOnWindowFocus: true,
	});

	// Transform raw sheet data into bracket structure
	const brackets = useMemo(() => {
		if (!query.data) {
			return {
				phaseName: phase?.phaseName || "",
				junior: [],
				senior: [],
			};
		}

		const juniorMatches = transformSheetDataToMatches(
			query.data.junior,
			`phase-${currentPhase}`,
			"A",
		);

		const seniorMatches = transformSheetDataToMatches(
			query.data.senior,
			`phase-${currentPhase}`,
			"C",
		);

		return {
			phaseName: phase?.phaseName || "",
			junior: juniorMatches,
			senior: seniorMatches,
		} as BracketPhase;
	}, [query.data, currentPhase, phase]);

	const handleShare = async () => {
		if (!selectedMatch) return;
		const shareText = `FIELD REPORT: ${selectedMatch.team1} (${selectedMatch.score1 ?? 0}) vs ${selectedMatch.team2} (${selectedMatch.score2 ?? 0}) at Station ${selectedMatch.station}. Phase Index ${currentPhase < 10 ? `0${currentPhase}` : currentPhase}.`;

		if (navigator.share) {
			try {
				await navigator.share({
					title: "Tournament Field Report",
					text: shareText,
					url: window.location.href,
				});
			} catch (err) {
				console.error("Share failed:", err);
			}
		} else {
			navigator.clipboard.writeText(shareText);
			setShared(true);
			setTimeout(() => setShared(false), 2000);
		}
	};

	const activeMatches =
		category === "junior" ? brackets.junior : brackets.senior;

	const nextPhase = () => setCurrentPhase((p) => (p + 1) % PHASES.length);
	const prevPhase = () =>
		setCurrentPhase((p) => (p - 1 + PHASES.length) % PHASES.length);

	return (
		<div className="min-h-screen bg-editorial-bg text-editorial-ink font-sans selection:bg-editorial-gold selection:text-white border-[12px] md:border-[24px] border-editorial-ink flex flex-col items-center bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] p-6 overflow-x-hidden relative">
			{/* Info Button */}
			<button
				onClick={() => setIsInfoOpen(true)}
				className="fixed top-6 right-6 z-30 bg-editorial-gold border-2 border-editorial-ink p-3 hover:bg-editorial-ink hover:text-editorial-gold transition-colors shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
				aria-label="Tournament information"
			>
				<Info size={24} className="font-bold" />
			</button>

			<InfoModal
				isOpen={isInfoOpen}
				onClose={() => setIsInfoOpen(false)}
				phase={currentPhase}
			/>

			<AnimatePresence mode="wait">
				{!selectedMatch ? (
					<div className="w-full flex flex-col items-center">
						<CategoryToggle
							category={category}
							onChange={setCategory}
						/>
						{query.isLoading && (
							<div className="text-center py-8">
								<p className="text-sm text-slate-600">
									Loading matches...
								</p>
							</div>
						)}
						{query.error && (
							<div className="text-center py-8">
								<p className="text-sm text-red-600">
									Error loading matches
								</p>
							</div>
						)}
						{!query.isLoading && !query.error && (
							<>
								<PhaseNavigation
									currentPhase={currentPhase}
									phaseName={brackets.phaseName}
									onPrevPhase={prevPhase}
									onNextPhase={nextPhase}
								/>
								<BracketList
									matches={activeMatches}
									onSelectMatch={setSelectedMatch}
								/>
							</>
						)}
					</div>
				) : (
					<MatchDetailView
						match={selectedMatch}
						currentPhase={currentPhase}
						shared={shared}
						effects={effects}
						onBack={() => setSelectedMatch(null)}
						onShare={handleShare}
						onCheerLeft={() => triggerEffect("cheer", "left")}
						onBooLeft={() => triggerEffect("boo", "left")}
						onCheerRight={() => triggerEffect("cheer", "right")}
						onBooRight={() => triggerEffect("boo", "right")}
					/>
				)}
			</AnimatePresence>
		</div>
	);
}
