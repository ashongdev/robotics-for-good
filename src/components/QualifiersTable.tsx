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

	return (
		<div className="w-full max-w-6xl mx-auto">
			{/* Header */}
			<div className="mb-12">
				<h2 className="text-3xl md:text-4xl font-black uppercase tracking-widest text-editorial-ink mb-4">
					Standings
				</h2>
				<div className="w-16 h-1 bg-editorial-gold"></div>
			</div>

			{/* Rankings Table */}
			<div className="overflow-x-auto">
				<table className="w-full border-collapse bg-white border-2 border-editorial-ink shadow-[3px_3px_0px_0px_rgba(26,26,26,0.2)]">
					<thead>
						<tr className="bg-editorial-ink text-white">
							<th className="px-4 py-4 text-left text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-12">
								Rank
							</th>
							<th className="px-4 py-4 text-left text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink">
								Team Name
							</th>
							<th className="px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-16">
								R1
							</th>
							<th className="px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-16">
								R2
							</th>
							<th className="px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-16">
								R3
							</th>
							<th className="px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-16">
								R4
							</th>
							<th className="px-4 py-4 text-center text-xs font-black uppercase tracking-widest border-b-2 border-editorial-ink w-20">
								Total
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedQualifiers.map((qualifier, index) => {
							// Determine podium colors
							let rowBg = "bg-white";
							let medalColor = "";

							if (index === 0) {
								rowBg = "bg-yellow-50";
								medalColor = "text-yellow-600 font-black";
							} else if (index === 1) {
								rowBg = "bg-gray-100";
								medalColor = "text-gray-600 font-black";
							} else if (index === 2) {
								rowBg = "bg-orange-50";
								medalColor = "text-orange-600 font-black";
							}

							return (
								<tr
									key={index}
									className={`border-b-2 border-editorial-ink ${rowBg} hover:bg-editorial-gold/10 transition-colors`}
								>
									<td
										className={`px-4 py-4 text-center font-black text-lg ${medalColor || "text-editorial-ink"}`}
									>
										{index === 0
											? "🥇"
											: index === 1
												? "🥈"
												: index === 2
													? "🥉"
													: index + 1}
									</td>
									<td className="px-4 py-4 text-sm font-semibold text-editorial-ink">
										{qualifier.team}
									</td>
									<td className="px-4 py-4 text-center text-sm font-bold text-editorial-ink">
										{qualifier.r1}
									</td>
									<td className="px-4 py-4 text-center text-sm font-bold text-editorial-ink">
										{qualifier.r2}
									</td>
									<td className="px-4 py-4 text-center text-sm font-bold text-editorial-ink">
										{qualifier.r3}
									</td>
									<td className="px-4 py-4 text-center text-sm font-bold text-editorial-ink">
										{qualifier.r4}
									</td>
									<td
										className={`px-4 py-4 text-center text-sm font-black uppercase ${
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
			<div className="mt-8 grid grid-cols-3 gap-4">
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
		</div>
	);
}
