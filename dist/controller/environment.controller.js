"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvironments = getEnvironments;
exports.createEnvironment = createEnvironment;
exports.deleteEnvironment = deleteEnvironment;
async function getEnvironments(req, res) {
    try {
        // const environments = await EnvironmentModel.find();
        res.status(200).json({ message: "Environments fetched successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching environments", error });
    }
}
async function createEnvironment(req, res) {
    try {
        // const { name, description } = req.body;
        // if (!name) {
        // return res.status(400).json({ message: "Name is required" });
        // }
        console.log(req.body);
        // const newEnvironment = new EnvironmentModel({ name, description });
        // await newEnvironment.save();
        res.status(201).json({ message: "Environment created successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating environment", error });
    }
}
async function deleteEnvironment(req, res) {
    try {
        const { name } = req.params;
        // const deletedEnvironment = await EnvironmentModel.findOneAndDelete({ name });
        // if (!deletedEnvironment) {
        // return res.status(404).json({ message: "Environment not found" });
        // }
        console.log(name);
        res.status(200).json({ message: "Environment deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting environment", error });
    }
}
