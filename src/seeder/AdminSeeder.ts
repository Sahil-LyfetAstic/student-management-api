import bcrypt from "bcryptjs";
import User from "../models/User";

const seedAdmin = async () => {

    try {
        const adminExists = await User.findOne({ email: "admin@admin.com" });

        if (adminExists) {
            console.log("Admin already exists.");
            return;
        }

        const admin = new User({
            name: "Admin User",
            email: "admin@admin.com",
            department: "Admin Department",
            password: 'admin',
            role: "admin",
        });


        await admin.save();
        console.log("Admin user seeded successfully.");
    } catch (error) {
        console.error("Error seeding admin:", error);
    }
};


export default seedAdmin;