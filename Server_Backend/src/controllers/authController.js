import User from "../models/User.js";

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (password.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already existes, please use a diffrent email address",
      });
    }

    const idx = Math.floot(Math.random() * 100) + 1;
    // this will generate a random number between 1 and 100

    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`;

    const newUser = new User.create({
      email,
      fullName,
      password,
      profilePic: randomAvatar,
    });

    
  } catch (error) {}
}

export async function login(req, res) {
  res.send("Login Route");
}

export async function logout(req, res) {
  res.send("Logout Route");
}
