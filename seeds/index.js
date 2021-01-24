const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/funcamp", {
	useCreateIndex: true,
	useCreateIndex: true,
	useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database Connected!");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 40) + 10;
		const camp = new Campground({
			author: "600a2620d36d699837d2ab3c",
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae accusamus ipsam voluptates numquam maiores? Impedit, quibusdam exercitationem ducimus ipsam alias possimus, cupiditate suscipit consequatur quia doloremque odio quos nostrum sapiente.",
			price,
			geometry: {
				type: "Point",
				coordinates: [-113.1331, 47.0202],
			},
			images: [
				{
					url:
						"https://res.cloudinary.com/do3ezfpjk/image/upload/v1611436603/FunCamp/h2aoi2qovxfof4wjisvf.png",
					filename: "FunCamp/h2aoi2qovxfof4wjisvf",
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
