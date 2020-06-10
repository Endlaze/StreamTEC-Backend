import * as connections from '../config/connections'
import { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt'

export interface IUserModel extends Document {
  createdAt?: Date;
  updatedAt?: Date
  name: string;
  email: string;
  phone: number;
  birthdate: Date;
  password: string;
  membership: number;
  videos: [{ idVideo: Number, purchasePrice: number, purchaseDate?: Date }],
  albums: [{ idAlbum: Number, tracks: { number: number, purchasePrice: number, purchaseDate?: Date } }];
  comparePassword: Function;
}

// Owned videos schema

const VideoSchema: Schema = new Schema({
  idVideo: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  }
});

// Owned music schema
const TrackSchema: Schema = new Schema({
  number: {
    type: Number,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  purchasePrice: {
    type: Number,
    required: true
  },
});

const AlbumSchema: Schema = new Schema({
  idAlbum: {
    type: Number,
    required: true
  },
  tracks: [TrackSchema]
}, {
  collection: 'purchasedMusic',
  timestamps: true,
  versionKey: false
});

// User schema
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: false,
    dropDups: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  membership: {
    type: Number,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  birthdate: {
    type: Date,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  albums: [AlbumSchema],
  videos: [VideoSchema]
}, {
  collection: 'userdb',
  timestamps: true,
  versionKey: false
});

UserSchema.pre('save', function (next: any): void {
  if (this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
  next();
  return this;
});

UserSchema.methods.comparePassword = function (password: String): boolean {

  return bcrypt.compareSync(password, this.password);
};

export default connections.db.model<IUserModel>('UserModel', UserSchema);