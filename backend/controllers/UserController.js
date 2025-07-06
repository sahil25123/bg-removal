import { Webhook } from "svix";
import User from "../models/user.js";

// API controller function to manage clerk user with database
// https://localhost:port/api/user/webhooks
const clerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svik-timestamp"],
      "svik-timestamp": req.headers["svik-timestamp"],
      "svik-signature": req.headers["svik-signature"],
    });
    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };
        await User.create(userData);
        res.json({});
        break;
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstname: data.first_name,
          lastname: data.last_name,
          photo: data.image_url,
        };
        await User.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await User.findOneAndDelete({ clerkId: data.id });
        res.json({});
        break;
      }

      default:
        break;
    }
  } catch (e) {
    console.error(e.message);
    res.json({ success: false, message: e.message });
  }
};


export {clerkWebHooks}