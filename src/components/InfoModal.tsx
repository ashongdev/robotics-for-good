import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

interface InfoModalProps {
	isOpen: boolean;
	onClose: () => void;
	phase?: number;
}

export function InfoModal({ isOpen, onClose, phase = 0 }: InfoModalProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="fixed inset-0 bg-black bg-opacity-80 z-40"
					/>
					{/* Modal */}
					<motion.div
						initial={{ scale: 0.5, opacity: 0, rotate: -2 }}
						animate={{ scale: 1, opacity: 1, rotate: 0 }}
						exit={{ scale: 0.5, opacity: 0, rotate: 2 }}
						transition={{
							type: "spring",
							stiffness: 300,
							damping: 30,
						}}
						className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg max-h-[80vh] overflow-y-auto"
					>
						<div className="bg-editorial-gold border-[8px] border-editorial-ink shadow-[12px_12px_0px_0px_rgba(26,26,26,1)] p-8">
							{/* Header with close button */}
							<div className="flex items-start justify-between mb-6">
								<div>
									<p className="text-[10px] font-black uppercase tracking-widest text-editorial-ink mb-2">
										ℹ️ TOURNAMENT RULES 2025-2026
									</p>
									<h2 className="text-2xl font-black text-editorial-ink">
										ROBOTICS FOR GOOD
									</h2>
								</div>
								<button
									onClick={onClose}
									className="p-1 hover:bg-editorial-ink hover:text-editorial-gold transition-colors"
									aria-label="Close modal"
								>
									<X size={24} />
								</button>
							</div>

							{/* Content */}
							<div className="space-y-4 text-sm text-editorial-ink leading-relaxed">
								<section>
									<h3 className="font-black text-base mb-2 uppercase tracking-wider">
										📋 Challenge Overview
									</h3>
									<p>
										Autonomous robots simulate agricultural
										tasks over 2-minute matches. The mission
										is divided into two parts:
										<span className="font-bold">
											{" "}
											Selective Irrigation
										</span>{" "}
										(watering seeded plots) and
										<span className="font-bold">
											{" "}
											Harvesting
										</span>{" "}
										(sorting ripe, diseased, and unripe
										fruit).
									</p>
								</section>

								<section>
									<h3 className="font-black text-base mb-2 uppercase tracking-wider">
										🎯 Phase Structure
									</h3>
									<ul className="space-y-1 text-[13px]">
										<li>
											<span className="font-bold">
												Qualifying (Phase 0):
											</span>{" "}
											Teams play a minimum of two rounds.
											Rankings are based on the{" "}
											<span className="font-bold">
												highest single score
											</span>
										</li>
										<li>
											<span className="font-bold">
												Elimination (Phase 1-2):
											</span>{" "}
											After the first phase, advancement
											is determined by{" "}
											<span className="font-bold">
												total points
											</span>{" "}
											obtained in that specific round.
										</li>
										<li>
											<span className="font-bold">
												Knockout (Phase 3+):
											</span>{" "}
											Head-to-head duels start from the
											Semifinals and Finals.
										</li>
									</ul>
								</section>

								<section>
									<h3 className="font-black text-base mb-2 uppercase tracking-wider">
										👥 Age Divisions
									</h3>
									<p>
										•{" "}
										<span className="font-bold">
											Junior:
										</span>{" "}
										Ages 10 to 14. <br />•{" "}
										<span className="font-bold">
											Senior:
										</span>{" "}
										Ages 15 to 18. Seniors face stricter
										rules, including negative points for
										misplaced seeds or watering empty plots.
									</p>
								</section>

								{phase === 0 ? (
									<section className="bg-editorial-ink text-editorial-gold p-4">
										<h3 className="font-black text-base mb-2 uppercase tracking-wider italic">
											⚡ Current: Qualifying Logic
										</h3>
										<p className="text-[13px]">
											Advancement is based on your{" "}
											<span className="font-black underline">
												BEST SINGLE ROUND
											</span>{" "}
											score. If you score 60 in Round 1
											and 120 in Round 2, your rank is
											based on 120.
										</p>
									</section>
								) : (
									<section className="bg-editorial-ink text-editorial-gold p-4">
										<h3 className="font-black text-base mb-2 uppercase tracking-wider italic">
											Current: Elimination Logic
										</h3>
										<p className="text-[13px]">
											Advancement is now based on your{" "}
											<span className="font-black underline">
												TOTAL ROUND POINTS.
											</span>{" "}
											Consistency across both matches in
											this phase is key to moving forward.
										</p>
									</section>
								)}
							</div>

							{/* Footer */}
							<div className="mt-6 pt-4 border-t-2 border-editorial-ink">
								<button
									onClick={onClose}
									className="w-full bg-editorial-ink text-editorial-gold font-black py-3 px-4 border-2 border-editorial-ink hover:bg-editorial-gold hover:text-editorial-ink transition-colors shadow-[4px_4px_0px_0px_rgba(26,26,26,1)]"
								>
									READY FOR THE CHALLENGE!
								</button>
							</div>
						</div>
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
