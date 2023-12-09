import mongoose from "mongoose";
 
const connectDB = async () => {
	try {
		const conn = await mongoose.connect('mongodb://127.0.0.1:27017/social-media', {
			// To avoid warnings in the console
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		});

		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		// eslint-disable-next-line no-undef
		process.exit(1);
	}
};

export default connectDB;