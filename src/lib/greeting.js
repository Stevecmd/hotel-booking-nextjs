/**
 * Returns a greeting message based on the current time of day.
 * @returns {string} A greeting message.
 */
export const getGreeting = () => {
	const hour = new Date().getHours();
	if (hour < 6) return "Good night";
	if (hour < 12) return "Good morning";
	if (hour < 18) return "Good afternoon";
	return "Good evening";
};
