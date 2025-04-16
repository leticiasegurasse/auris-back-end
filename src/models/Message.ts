import mongoose, { Schema, Document } from 'mongoose';

interface IMessage {
  sender: string;
  content: string;
}

export interface IConversation extends Document {
  userId: mongoose.Types.ObjectId;
  messages: IMessage[];
}

const MessageSchema: Schema = new Schema({
  sender: { type: String, required: true },
  content: { type: String, required: true }
}, { _id: true });

const ConversationSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [MessageSchema]
});

export default mongoose.model<IConversation>('Conversation', ConversationSchema);
