import { Photo } from './Photo';

export interface Member {
  id: number;
  username: string;
  photoUrl: string;
  knownAs: string;
  city: string;
  country: string;
  gender: string;
  lookingFor: string;
  interests?: string;
  introduction: string;
  age: number;
  created: Date;
  lastActive: Date;
  photos: Photo[];
}
