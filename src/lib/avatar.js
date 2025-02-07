// male hair styles = hat, variant60, variant53, variant49, variant44
// female hair styles = variant01, variant02, variant03, variant04, variant10
// background colour can be changed to any hex value by default it is transparent
// TODO: user selected background colour generation

/**
 * Generates an avatar based on the user's gender and first name.
 * @param {string} gender - The gender of the user.
 * @param {string} firstName - The first name of the user.
 * @returns {Promise<string>} A promise that resolves to the URL of the generated avatar.
 */
const avatarGenerator = async (gender, firstName) => {
	let baseUrl = "https://api.dicebear.com/9.x/";
	let avatarStyle = "notionists";
	let hairVariant = "";
	let beardProbability = "25";

	const options = {
		bodyIconProbability: "10",
		gestureProbability: "0",
		backgroundColor: "transparent",
	};

	// select gender-specific hair variants
	if (gender === "male") {
		hairVariant = "hat,variant60,variant53,variant49,variant44";
	} else if (gender === "female") {
		hairVariant = "variant01,variant02,variant03,variant04,variant10";
		beardProbability = "0";
	}


	// Build url string based on options
	const url = `${baseUrl}${avatarStyle}/svg?seed=${firstName}&hair=${hairVariant}&beardProbability=${beardProbability}&${new URLSearchParams(options).toString()}`;
	//debug
	//console.log(url);

	// fetch avatar from api
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error("Failed to fetch avatar");
	}

	return response.url;
};

export default avatarGenerator;
