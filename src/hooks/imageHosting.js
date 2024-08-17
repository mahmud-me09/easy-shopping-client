const imgbbUpload = async (file) => {
	const apiKey = import.meta.env.VITE_IMGBB_API;

	const formData = new FormData();
	formData.append("image", file);

	try {
		const response = await fetch(
			"https://api.imgbb.com/1/upload?key=" + apiKey,
			{
				method: "POST",
				body: formData,
			}
		);

		if (!response.ok) {
			throw new Error(`Error: ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (error) {
		console.error("Error uploading image:", error);
		throw error;
	}
};
export default imgbbUpload;
