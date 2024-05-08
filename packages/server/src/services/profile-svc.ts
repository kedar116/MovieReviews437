import {Profile} from "../models/profile";
import {Schema,Model,Document,model} from "mongoose";

const ProfileSchema = new Schema<Profile>(
    {
        id: { type: String, required: true, trim:true },
        name:{ type: String, required: true, trim:true },
        nickname:{ type: String, required: true },
        avatar: String,
        color: String
    },
    {collection: "user_profiles" }

);

const ProfileModel = model<Profile>("Profile", ProfileSchema);

function index(): Promise<Profile[]> {
    return ProfileModel.find();
  }
  

function get(userid: string): Promise<Profile> {
    return ProfileModel.findOne({ id: userid })
        .then((profile) => {
        if (!profile) throw new Error(`${userid} Not Found`);
        return profile;
        })
        .catch((err) => {
        throw new Error(`${userid} Not Found`);
        });
}

// function get(userid: String): Promise<Profile> {
//     return ProfileModel.find({ userid })
//       .then((list) => list[0])
//       .catch((err) => {
//         throw `${userid} Not Found`;
//       });
//   }

  function create(profile: Profile): Promise<Profile> {
    const p = new ProfileModel(profile);
    return p.save();
  }

  export default { index, get, create };
  

// let profiles: Array<Profile> =[

//     {
//         id: "blaze",
//         name: "Blaze Pasquale",
//         nickname: undefined,
//         color: "#8A81BE",
//         avatar: "/data/avatars/Blaze Pasquale.png"
//       },

//       {
//         id: "nick",
//         name: "Nick Fury",
//         nickname: "fury",
//         color: "red",
//         avatar: "/data/avatars/second.png"
//       },

//       {
//         id: "James",
//         name: "James Cameron",
//         nickname: undefined,
//         color: "blue",
//         avatar: "/data/avatars/third.png"
//       },

//       {
//         id: "Charles",
//         name: "Charles Javier",
//         nickname: "Jav",
//         color: "orange",
//         avatar: "/data/avatars/fourth.png"
//       },

//       {
//         id: "Micheal",
//         name: "Micheal Jones",
//         nickname: undefined,
//         color: "green",
//         avatar: "/data/avatars/fifth.png"
//       }
// ];

// export function get(id:String):Profile | undefined{
//     return profiles.find((t) => t.id===id);
// }

// export default { get };