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
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			image: "https://source.unsplash.com/collection/357786/1600x900",
			description:
				"Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae accusamus ipsam voluptates numquam maiores? Impedit, quibusdam exercitationem ducimus ipsam alias possimus, cupiditate suscipit consequatur quia doloremque odio quos nostrum sapiente.",
			price,
		});
		await camp.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
