import mongoose from "mongoose";
import acmModel from "./acmModel.js";

const clientSchema = new mongoose.Schema(
    {
        clientId: {type: Number, required: true, unique: true},
        name: {type: String, required: true},
        priorityTier: {
            type: String,
            required: true,
            enum: ["1", "2", "3", "4", "5"]
        },
        industry: {type: String, required: true},
        activeClient: {type: Boolean, required: true, default: true},
        projectsOpen: {type: Number, required: true, default: 0},
        projectsClosed: {type: Number, required: true, default: 0},
        contactPerson: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        phoneNumber: {type: String, required: true, unique: true},
        handlingAccountManager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AccountManager",
            required: true},
        isDeleted: {type: Boolean, required: true, default: false},
    },
    {
        timestamps: true,
    },
);

const updateAcmAcctCount = async (handlingAccountManager) => {
    try{
        const count = await clientModel.countDocuments({handlingAccountManager, activeClient: true, isDeleted: false});

        await acmModel.findByIdAndUpdate(handlingAccountManager, {accountsHandling: count});
    } catch (error) {
        console.error("Error updating Account Manager accounts count:", error);
    };
};

let oldHandlingAccountManager = null;

const updateRelatedCounts = async(doc) => {
    try{
        if(!doc) return;
        await updateAcmAcctCount(doc.handlingAccountManager);
    } catch (error) {
        console.error("Error updating related counts:", error);
    };
};

clientSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const doc = await this.model.findOne(this.getQuery());
    if (doc) {
      oldHandlingAccountManager = doc.handlingAccountManager;
    }
  } catch (error) {
    console.error("Error in pre-update hook:", error);
  }
  next();
});

const handleChange = async function (doc) {
    try {
        await updateRelatedCounts(doc);
    } catch (error) {
        console.error("Error in post-save hook:", error);
    };
};

clientSchema.post("save", handleChange);

clientSchema.post("findOneAndUpdate", async function (doc) {
    try {
        if (!doc) return;

        const update = this.getUpdate();
        const isSoftDelete = update?.isDeleted === true;

        await updateAcmAcctCount(doc.handlingAccountManager);

    if (oldHandlingAccountManager && (!oldHandlingAccountManager.equals(doc.handlingAccountManager) || isSoftDelete)) {
      await updateAcmAcctCount(oldHandlingAccountManager);
    }
    } catch (error) {
        console.error("Error in post-update hook:", error);
    } finally {
        oldHandlingAccountManager = null;
    }
    });

clientSchema.post("findOneAndDelete", handleChange)

const clientModel = mongoose.model("Client", clientSchema);

export default clientModel;