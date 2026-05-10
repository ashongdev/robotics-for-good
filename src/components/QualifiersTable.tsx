import { useState } from "react";

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

	// Sort by total score descending
	const sortedQualifiers = [...qualifiers].sort(
		(a, b) => parseInt(b.total) - parseInt(a.total),
	);

	// Determine how many teams progress (top 8)
	const progressCount = Math.min(8, sortedQualifiers.length);

	return (
		<div className="w-full max-w-6xl mx-auto px-4 md:px-0">
			{/* Header */}
			<div className="mb-12">
				<h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-editorial-ink mb-4">
					Standings
				</h2>
				<div className="w-16 h-1 bg-editorial-gold mb-4"></div>
				<p className="text-sm text-gray-600">
					<span className="inline-block w-3 h-3 bg-editorial-gold mr-2"></span>
					Top {progressCount} teams progress to next round
				</p>
				<p className="text-xs text-gray-500 mt-2">
					Click a team to view all details
				</p>
			</div>

			{/* Rankings Table */}
			<div className="overflow-x-hidden">
				<table className="w-full border-collapse bg-white border-2 border-editorial-ink shadow-[3px_3px_0px_0px_rgba(26,26,26,0.2)]">
					<thead>
						<tr className="bg-editorial-ink text-white">
							<th className="px-2 md:px-4 py-4 text-left text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-10 md:w-12">
								Rank
							</th>
							<th className="px-2 md:px-4 py-4 text-left text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink flex-1 min-w-0">
								Team Name
							</th>
							<th className="hidden sm:table-cell px-2 md:px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-12">
								R1
							</th>
							<th className="hidden md:table-cell px-2 md:px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-12">
								R2
							</th>
							<th className="hidden md:table-cell px-2 md:px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-12">
								R3
							</th>
							<th className="hidden lg:table-cell px-2 md:px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-12">
								R4
							</th>
							<th className="px-2 md:px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-14">
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedQualifiers.map((qualifier, index) => {
							// Check if team progresses to next round
							const progresses = index < progressCount;

							return (
								<tr
									key={index}
									onClick={() => setSelectedTeam(qualifier)}
									className={`border-b-2 border-editorial-ink border-l-4 cursor-pointer ${
										progresses
											? "border-l-editorial-gold bg-white hover:bg-editorial-gold/5"
											: "border-l-transparent bg-white hover:bg-gray-50"
									} transition-colors`}
								>
									<td className="px-2 md:px-4 py-4 text-center font-black text-sm md:text-lg text-editorial-ink">
										{index + 1}
										{progresses && (
											<span className="ml-1 text-editorial-gold">
												↑
											</span>
										)}
									</td>
									<td className="px-2 md:px-4 py-4 text-xs md:text-sm font-semibold text-editorial-ink truncate md:truncate-none">
										{qualifier.team}
									</td>
									<td className="hidden sm:table-cell px-2 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-editorial-ink">
										{qualifier.r1}
									</td>
									<td className="hidden md:table-cell px-2 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-editorial-ink">
										{qualifier.r2}
									</td>
									<td className="hidden md:table-cell px-2 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-editorial-ink">
										{qualifier.r3}
									</td>
									<td className="hidden lg:table-cell px-2 md:px-4 py-4 text-center text-xs md:text-sm font-bold text-editorial-ink">
										{qualifier.r4}
									</td>
									<td
										className={`px-2 md:px-4 py-4 text-center text-xs md:text-sm font-black uppercase ${
											parseInt(qualifier.total) > 0
												? "text-editorial-green"
												: "text-gray-400"
										}`}
									>
										{qualifier.total}
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>

			{/* Stats Footer */}
			<div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
				<div className="p-4 bg-white border-2 border-editorial-ink shadow-[2px_2px_0px_0px_rgba(26,26,26,0.1)]">
					<p className="text-xs font-black uppercase tracking-widest text-editorial-ink mb-2">
						Total Teams
					</p>
					<p className="text-3xl font-black text-editorial-gold">
						{sortedQualifiers.length}
					</p>
				</div>
				<div className="p-4 bg-white border-2 border-editorial-ink shadow-[2px_2px_0px_0px_rgba(26,26,26,0.1)]">
					<p className="text-xs font-black uppercase tracking-widest text-editorial-ink mb-2">
						Highest Score
					</p>
					<p className="text-3xl font-black text-editorial-green">
						{sortedQualifiers.length > 0
							? sortedQualifiers[0].total
							: "—"}
					</p>
				</div>
				<div className="p-4 bg-white border-2 border-editorial-ink shadow-[2px_2px_0px_0px_rgba(26,26,26,0.1)]">
					<p className="text-xs font-black uppercase tracking-widest text-editorial-ink mb-2">
						Rounds
					</p>
					<p className="text-3xl font-black text-editorial-ink">4</p>
				</div>
			</div>

			{/* Detail Modal */}
			{selectedTeam && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
					onClick={() => setSelectedTeam(null)}
				>
					<div
						className="bg-white border-2 border-editorial-ink shadow-[4px_4px_0px_0px_rgba(26,26,26,0.3)] max-w-md w-full"
						onClick={(e) => e.stopPropagation()}
					>
						<div className="sticky top-0 bg-editorial-ink text-white p-4 border-b-2 border-editorial-ink flex justify-between items-center">
							<h3 className="text-lg font-black uppercase tracking-widest">
								{selectedTeam.team}
							</h3>
							<button
								onClick={() => setSelectedTeam(null)}
								className="text-2xl leading-none hover:text-editorial-gold transition-colors"
							>
								×
							</button>
						</div>
						<div className="p-6 space-y-4">
							<div className="grid grid-cols-2 gap-4">
								<div className="p-3 bg-gray-50 border-2 border-gray-200">
									<p className="text-xs font-black uppercase tracking-widest text-editorial-ink mb-2">
										Rank
									</p>
									<p className="text-2xl font-black text-editorial-ink">
										{selectedTeam.rank}
									</p>
								</div>
								<div className="p-3 bg-green-50 border-2 border-editorial-green">
									<p className="text-xs font-black uppercase tracking-widest text-editorial-ink mb-2">
										Total
									</p>
									<p className="text-2xl font-black text-editorial-green">
										{selectedTeam.total}
									</p>
								</div>
							</div>

							<div className="border-t-2 border-editorial-ink pt-4">
								<p className="text-xs font-black uppercase tracking-widest text-editorial-ink mb-3">
									Round Scores
								</p>
								<div className="grid grid-cols-4 gap-2">
									{[
										{ label: "R1", score: selectedTeam.r1 },
										{ label: "R2", score: selectedTeam.r2 },
										{ label: "R3", score: selectedTeam.r3 },
										{ label: "R4", score: selectedTeam.r4 },
									].map((round) => (
										<div
											key={round.label}
											className="p-3 bg-white border-2 border-editorial-ink text-center"
										>
											<p className="text-xs font-black uppercase tracking-widest text-gray-600 mb-1">
												{round.label}
											</p>
											<p className="text-lg font-black text-editorial-ink">
												{round.score}
											</p>
										</div>
									))}
								</div>
							</div>

							<button
								onClick={() => setSelectedTeam(null)}
								className="w-full bg-editorial-gold border-2 border-editorial-ink p-3 hover:bg-editorial-ink hover:text-editorial-gold transition-colors font-black uppercase tracking-widest text-sm mt-4"
							>
								Close
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
