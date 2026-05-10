import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function AnimatedPanel({
	isOpen,
	children,
}: {
	isOpen: boolean;
	children: React.ReactNode;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (ref.current) {
			setHeight(isOpen ? ref.current.scrollHeight : 0);
		}
	}, [isOpen, children]);

	return (
		<div
			style={{
				height: `${height}px`,
				overflow: "hidden",
				transition: "height 250ms cubic-bezier(0.4, 0, 0.2, 1)",
			}}
		>
			<div ref={ref}>{children}</div>
		</div>
	);
}

interface QualifierTeam {
	rank: number;
	team: string;
	r1: string;
	r2: string;
	r3: string;
	r4: string;
	total: string;
}

interface QualifiersTableProps {
	data: string[][];
}

export function QualifiersTable({ data }: QualifiersTableProps) {
	const [selectedTeam, setSelectedTeam] = useState<QualifierTeam | null>(
		null,
	);
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	if (!data || data.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-sm text-red-600">
					No qualifier data available
				</p>
			</div>
		);
	}

	const qualifiers: QualifierTeam[] = data.map((row, index) => ({
		rank: index + 1,
		team: row[0] || "",
		r1: row[1] || "0",
		r2: row[2] || "0",
		r3: row[3] || "0",
		r4: row[4] || "0",
		total: row[5] || "0",
	}));

	const sortedQualifiers = [...qualifiers].sort(
		(a, b) => parseInt(b.total) - parseInt(a.total),
	);

	const progressCount = Math.min(8, sortedQualifiers.length);

	const totalPages = Math.ceil(sortedQualifiers.length / itemsPerPage);
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const pageQualifiers = sortedQualifiers.slice(startIndex, endIndex);

	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const handlePrevPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	return (
		<div className="w-full max-w-6xl mx-auto space-y-0">
			{/* ── Title block ── */}
			<div className="px-4 md:px-0 pb-5">
				<h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-editorial-ink">
					Standings
				</h2>
				<div className="w-16 h-1 bg-editorial-gold mt-3 mb-3" />
				<p className="text-xs text-gray-500 flex items-center gap-2">
					<span className="inline-block w-3 h-3 bg-editorial-gold" />
					Top {progressCount} teams progress · tap a row to expand
				</p>
			</div>

			{/* ── Column header ── */}
			<div className="flex items-center gap-3 px-3 py-2 bg-editorial-ink border-2 border-editorial-ink border-l-4 border-l-editorial-ink">
				<span className="w-8 flex-shrink-0 text-[10px] font-black uppercase tracking-widest text-white/60">
					#
				</span>
				<span className="flex-1 min-w-0 text-[10px] font-black uppercase tracking-widest text-white/60">
					Team
				</span>
				<span className="hidden sm:flex items-center gap-1 flex-shrink-0">
					{["R1", "R2", "R3", "R4"].map((r) => (
						<span
							key={r}
							className="inline-flex items-center justify-center w-9 text-[10px] font-black uppercase tracking-widest text-white/60"
						>
							{r}
						</span>
					))}
				</span>
				<span className="flex-shrink-0 w-12 text-right text-[10px] font-black uppercase tracking-widest text-white/60">
					Total
				</span>
			</div>

			{/* ── Ranked list ── */}
			<div className="space-y-0">
				{pageQualifiers.map((qualifier, index) => {
					const actualIndex = startIndex + index;
					const progresses = actualIndex < progressCount;
					const isExpanded = selectedTeam?.team === qualifier.team;

					return (
						<div key={actualIndex}>
							{/* Row */}
							<button
								onClick={() =>
									setSelectedTeam(
										isExpanded ? null : qualifier,
									)
								}
								className={`w-full text-left flex items-center gap-3 px-3 py-3 border-t border-b-0 border-r-0 border-editorial-ink/20 border-l-4 transition-colors ${
									progresses
										? "border-l-editorial-gold"
										: "border-l-transparent"
								} ${
									isExpanded
										? "bg-editorial-ink text-white"
										: "bg-white hover:bg-editorial-gold/5"
								}`}
							>
								{/* Rank badge */}
								<span
									className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border-2 font-black text-sm ${
										isExpanded
											? "border-white text-white"
											: "border-editorial-ink text-editorial-ink"
									}`}
								>
									{actualIndex + 1}
								</span>

								{/* Team name */}
								<span
									className={`flex-1 min-w-0 text-sm font-semibold truncate ${
										isExpanded
											? "text-white"
											: "text-editorial-ink"
									}`}
								>
									{qualifier.team}
								</span>

								{/* Round pills — hidden on very small screens */}
								<span className="hidden sm:flex items-center gap-1 flex-shrink-0">
									{[
										qualifier.r1,
										qualifier.r2,
										qualifier.r3,
										qualifier.r4,
									].map((score, i) => (
										<span
											key={i}
											className={`inline-flex items-center justify-center w-9 h-7 text-xs font-bold border ${
												isExpanded
													? "border-white/40 text-white"
													: "border-editorial-ink/20 text-editorial-ink"
											}`}
										>
											{score}
										</span>
									))}
								</span>

								{/* Total */}
								<span
									className={`flex-shrink-0 w-12 text-right text-sm font-black ${
										isExpanded
											? "text-editorial-gold"
											: parseInt(qualifier.total) > 0
												? "text-editorial-green"
												: "text-gray-400"
									}`}
								>
									{qualifier.total}
								</span>
							</button>

							{/* Inline expanded detail — animated */}
							<AnimatedPanel isOpen={isExpanded}>
								<div className="bg-white border-t border-editorial-ink/10 px-4 py-4">
									<div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
										{[
											{
												label: "Round 1",
												score: qualifier.r1,
											},
											{
												label: "Round 2",
												score: qualifier.r2,
											},
											{
												label: "Round 3",
												score: qualifier.r3,
											},
											{
												label: "Round 4",
												score: qualifier.r4,
											},
										].map((round) => (
											<div
												key={round.label}
												className="flex items-center justify-between sm:flex-col sm:items-center sm:justify-center p-3 bg-gray-50 border border-editorial-ink/15 sm:text-center"
											>
												<p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
													{round.label}
												</p>
												<p className="text-xl font-black text-editorial-ink">
													{round.score}
												</p>
											</div>
										))}
									</div>
									<div className="flex items-center justify-between text-xs text-gray-400 pt-3 border-t border-gray-100">
										<span>
											Rank{" "}
											<strong className="text-editorial-ink">
												{actualIndex + 1}
											</strong>{" "}
											of {sortedQualifiers.length}
										</span>
										<span className="font-black text-editorial-green text-sm">
											{qualifier.total} pts
										</span>
									</div>
								</div>
							</AnimatedPanel>
						</div>
					);
				})}
			</div>

			{/* ── Pagination ── */}
			<div className="pt-4 px-4 md:px-0">
				<div className="flex items-center justify-start gap-2">
					<button
						onClick={handlePrevPage}
						disabled={currentPage === 1}
						className="flex items-center justify-center w-9 h-9 border-2 border-editorial-ink bg-white hover:bg-editorial-gold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
					>
						<ChevronLeft className="h-4 w-4" />
					</button>
					<button
						onClick={handleNextPage}
						disabled={currentPage === totalPages}
						className="flex items-center justify-center w-9 h-9 border-2 border-editorial-ink bg-white hover:bg-editorial-gold disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
					>
						<ChevronRight className="h-4 w-4" />
					</button>
				</div>
				<p className="text-[10px] text-gray-500 mt-2">
					{startIndex + 1}–
					{Math.min(endIndex, sortedQualifiers.length)} of{" "}
					{sortedQualifiers.length} teams
				</p>
			</div>
		</div>
	);
}
