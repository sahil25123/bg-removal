import { Webhook } from "svix";
import User from "../models/user.js";

// API controller function to manage clerk user with database
// https://localhost:port/api/user/webhooks
const clerkWebHooks = async (req, res) => {
  try {
    // Verify the webhook signature
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    const payload = JSON.stringify(req.body);
    const headers = {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature']
    };

    try {
      await whook.verify(payload, headers);
    } catch (err) {
      console.error('Webhook verification failed:', err);
      return res.status(400).json({ success: false, message: 'Invalid signature' });
    }

    const { data, type } = req.body;
    console.log(`Processing webhook event: ${type}`);

    try {
      switch (type) {
        case "user.created": {
          if (!data.email_addresses?.[0]?.email_address) {
            throw new Error('No email address provided in webhook data');
          }
          
          const userData = {
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            firstname: data.first_name || '',
            lastname: data.last_name || '',
            photo: data.image_url || '',
          };
          
          const newUser = await User.create(userData);
          console.log('User created in DB:', newUser);
          return res.status(200).json({ success: true, message: 'User created successfully' });
        }
        
        case "user.updated": {
          const userData = {
            email: data.email_addresses?.[0]?.email_address,
            firstname: data.first_name,
            lastname: data.last_name,
            photo: data.image_url,
          };
          
          const updatedUser = await User.findOneAndUpdate(
            { clerkId: data.id },
            { $set: userData },
            { new: true, runValidators: true }
          );
          
          if (!updatedUser) {
            console.warn(`User with clerkId ${data.id} not found for update`);
            return res.status(404).json({ success: false, message: 'User not found' });
          }
          
          console.log('User updated in DB:', updatedUser);
          return res.status(200).json({ success: true, message: 'User updated successfully' });
        }
        
        case "user.deleted": {
          const deletedUser = await User.findOneAndDelete({ clerkId: data.id });
          if (!deletedUser) {
            console.warn(`User with clerkId ${data.id} not found for deletion`);
            return res.status(404).json({ success: false, message: 'User not found' });
          }
          console.log('User deleted from DB:', deletedUser);
          return res.status(200).json({ success: true, message: 'User deleted successfully' });
        }
        
        default:
          console.log(`Unhandled event type: ${type}`);
          return res.status(200).json({ success: true, message: 'Event received but not processed' });
      }
    } catch (error) {
      console.error('Error processing webhook event:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Error processing webhook event',
        error: error.message 
      });
    }
  } catch (e) {
    console.error('Unexpected error in webhook handler:', e);
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error',
      error: e.message 
    });
  }
};


export {clerkWebHooks}



const userCredits = async (req, res) =>{
    try{

        const {clerkId} = req.body;

        const userData = await User.findOne({clerkId})
    }

    catch(e){
        console.log(e.message);

        res.json({success:false , message :e.message})
    }



}
export {userCredits};