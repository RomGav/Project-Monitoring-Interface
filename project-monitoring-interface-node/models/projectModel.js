import mongoose from "mongoose";
import clientModel from "./clientModel.js";
import pmModel from "./pmModel.js";

const projectSchema = new mongoose.Schema(
    {
        projectId: {type: Number, required: true, unique: true},
        name: {type: String, required: true},
        client: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
            required: true,
        },
        projectStatus: {
            type: String,
            required: true,
            default: "Open",
            enum: ["Open", "Closed"]
        },
        type: {type: String, required: true},
        description: {type: String, required: true},
        handlingAccountManager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AccountManager",
            required: true,        
        },
        handlingProjectManager: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProjectManager",
            required: true},
        assetsURL: {type: String, required: true, unique: true},
        projectMovement: {
            type: String,
            required: true,
            enum: ["Pitching", "Planning", "Execution", "Reporting", "Finished"]
        },
        price: {type: Number, required: true},
        budgetAllocated: {type: Number, required: true},
        budgetUsed: {type: Number, required: true, default: 0},
        paymentStatus: {
            type: String, 
            required: true,
            enum: ["Pending", "Partially Paid", "Paid", "Overdue"],
        },
        isDeleted: {type: Boolean, required: true, default: false},
    },
    {
        timestamps: true,
    },
);

// Utility Funcitons
const updateClientProjCount = async (client) => {
    try{
        const [openCount, closedCount] = await Promise.all([
            projectModel.countDocuments({client, projectStatus: "Open", isDeleted: false }),
            projectModel.countDocuments({ client, projectStatus: "Closed", isDeleted: false })
        ]);
        await clientModel.findByIdAndUpdate(client, {
            projectsOpen: openCount,
            projectsClosed: closedCount,
        });
    } catch (error) {
        console.error("Error updating Client open and closed projects count:", error);
    };
};

const updatePmProjCount = async (handlingProjectManager) => {
    try{
        const count = await projectModel.countDocuments({handlingProjectManager, projectStatus: "Open", isDeleted: false});

        await pmModel.findByIdAndUpdate(handlingProjectManager, {projectsHandling: count});
    } catch (error) {
        console.error("Error updating Project Manager projects count:", error);
    };
};

const updateRelatedCounts = async(doc) => {
    try{
        if(!doc) return;
        await Promise.all([
            updateClientProjCount(doc.client), 
            updatePmProjCount(doc.handlingProjectManager)
        ]);
    }catch(error){
        console.error("Error updating related counts:", error);
    };
};

const handleChange = async function (doc) {
    try {
        await updateRelatedCounts(doc);
    } catch (error) {
        console.error("Error in post-save hook:", error);
    };
};

let oldClient = null;
let oldHandlingProjectManager = null;

projectSchema.pre("findOneAndUpdate", async function (next) {
    try {
        const doc = await this.model.findOne(this.getQuery());
        if (doc) {
            oldClient = doc.client;
            oldHandlingProjectManager = doc.handlingProjectManager;
        };

        const update = this.getUpdate();
        if (update.client) {
            const client = await clientModel.findById(update.client);
            if (client) {
                update.handlingAccountManager = client.handlingAccountManager;
            };
        };
    } catch (error) {
        console.error("Error in pre-update hook:", error);
    };
    next();
});

projectSchema.post("save", handleChange)

projectSchema.post("findOneAndUpdate", async function (doc) {
    try {
        if (!doc) return;

        const update = this.getUpdate();
        const isSoftDelete = update?.isDeleted === true;

        // Always update new references
        await updateClientProjCount(doc.client);
        await updatePmProjCount(doc.handlingProjectManager);

        // Update old references if changed or soft-deleted
        const clientChanged = oldClient && !oldClient.equals(doc.client);
        const pmChanged = oldHandlingProjectManager && !oldHandlingProjectManager.equals(doc.handlingProjectManager);

        if (clientChanged || isSoftDelete) {
            await updateClientProjCount(oldClient);
        };
        if (pmChanged || isSoftDelete) {
            await updatePmProjCount(oldHandlingProjectManager);
        };
    } catch (error) {
        console.error("Error in post-update hook:", error);
    } finally {
        oldClient = null;
        oldHandlingProjectManager = null;
    };
});

projectSchema.post("findOneAndDelete", handleChange);

const projectModel = mongoose.model("Project", projectSchema);

export default projectModel;