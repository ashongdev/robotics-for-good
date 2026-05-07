/**
 * Parses Google Sheets match data and transforms it to bracket format
 *
 * Each row in sheets has: [TEAM_A, R1, R2, space, TEAM_B, R1, R2, space, WINNER]
 */

export interface SheetMatchData {
	values: string[][];
}

export interface ParsedMatch {
	team1: string;
	team2: string;
	score1: number;
	score2: number;
	winner: number | null;
}

export function parseSheetMatch(row: string[]): ParsedMatch | null {
	if (!row || row.length < 9) return null;

	const team1 = row[0]?.trim();
	const team1_r1 = parseInt(row[1] || "0", 10) || 0;
	const team1_r2 = parseInt(row[2] || "0", 10) || 0;

	const team2 = row[4]?.trim();
	const team2_r1 = parseInt(row[5] || "0", 10) || 0;
	const team2_r2 = parseInt(row[6] || "0", 10) || 0;

	const winningTeam = row[8]?.trim();

	// Skip empty rows
	if (!team1 || !team2) return null;

	const score1 = team1_r1 + team1_r2;
	const score2 = team2_r1 + team2_r2;

	let winner: number | null = null;
	if (winningTeam === team1) {
		winner = 0;
	} else if (winningTeam === team2) {
		winner = 1;
	}

	return {
		team1,
		team2,
		score1,
		score2,
		winner,
	};
}

export function parseSheetData(
	data: SheetMatchData,
	baseStation: string = "A",
): ParsedMatch[] {
	return data.values
		.map((row, index) => {
			const parsed = parseSheetMatch(row);
			if (!parsed) return null;
			return parsed;
		})
		.filter((match): match is ParsedMatch => match !== null);
}
