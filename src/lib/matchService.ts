import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";

export interface Match {
	id: string;
	team1: string;
	team2: string;
	team1Score: number | null;
	team2Score: number | null;
	team1R1: number | null;
	team1R2: number | null;
	team2R1: number | null;
	team2R2: number | null;
	winner: number | null;
	station: string;
	isBye?: boolean;
}

/**
 * Fetch matches from Firestore and parse them
 */
export async function fetchMatchesFromFirestore(
	phaseId: string,
	division: "junior" | "senior",
): Promise<Match[]> {
	try {
		const matchesRef = collection(db, "phases", phaseId, division);
		const q = query(matchesRef);
		const snapshot = await getDocs(q);

		const matches: Match[] = [];
		snapshot.forEach((doc, index) => {
			const data = doc.data();
			matches.push({
				id: doc.id,
				team1: data.team1 || "",
				team2: data.team2 || "",
				team1Score: data.team1Score ?? null,
				team2Score: data.team2Score ?? null,
				team1R1: data.team1R1 ?? null,
				team1R2: data.team1R2 ?? null,
				team2R1: data.team2R1 ?? null,
				team2R2: data.team2R2 ?? null,
				winner: data.winner ?? null,
				station:
					data.station || `${String(index + 1).padStart(2, "0")}`,
			});
		});

		return matches;
	} catch (error) {
		console.error("Error fetching matches:", error);
		return [];
	}
}

/**
 * Parse raw sheet data into matches
 */
export function transformSheetDataToMatches(
	sheetData: string[][],
	phaseId: string,
	baseStation: string = "A",
): Match[] {
	return sheetData
		.map((row, index) => {
			if (!row || row.length < 9) return null;

			const team1 = row[0]?.trim();
			const team1R1 = parseInt(row[1] || "0", 10) || 0;
			const team1R2 = parseInt(row[2] || "0", 10) || 0;

			const tableNumber = row[3]?.trim() || "";

			const team2 = row[4]?.trim();
			const team2R1 = parseInt(row[5] || "0", 10) || 0;
			const team2R2 = parseInt(row[6] || "0", 10) || 0;

			const winningTeam = row[8]?.trim();

			// Skip empty rows
			if (!team1) return null;

			const team1Score = team1R1 + team1R2;
			const team2Score = team2R1 + team2R2;

			// Handle bye scenario (only team1, no team2)
			if (!team2) {
				return {
					id: `${phaseId}-${index}`,
					team1,
					team2: "",
					team1Score: null,
					team2Score: null,
					team1R1: null,
					team1R2: null,
					team2R1: null,
					team2R2: null,
					winner: 0, // Team 1 automatically wins a bye
					station:
						tableNumber ||
						`${baseStation}-${String(index + 1).padStart(2, "0")}`,
					isBye: true,
				} as Match;
			}

			let winner: number | null = null;
			if (winningTeam === team1) {
				winner = 0;
			} else if (winningTeam === team2) {
				winner = 1;
			}

			return {
				id: `${phaseId}-${index}`,
				team1,
				team2,
				team1Score,
				team2Score,
				team1R1,
				team1R2,
				team2R1,
				team2R2,
				winner,
				station: tableNumber || `${String(index + 1).padStart(2, "0")}`,
				isBye: false,
			} as Match;
		})
		.filter((match): match is Match => match !== null);
}
