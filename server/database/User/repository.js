const userModel = require("./model")


class UserRepository {
    constructor() {
        this.model = userModel;
    }

    async create(query) {
        console.log("UserRepository:::::create");
        return this.model.create(query);
    }

    async getAll() {
        console.log("UserRepository:::::getAll");
        return this.model.find({});
    }

    async getByQuery(query, projection = {}) {
        console.log("UserRepository:::::getByQuery", query);
        return this.model.findOne(query, projection);
    }

    async update(query) {
        const { id, ...rest } = query;
        console.log("UserRepository:::::update", id);
        return this.model.updateOne({ _id: id }, { $set: rest });
    }

    async delete(query) {
        const { id } = query;
        console.log("UserRepository:::::delete", id);
        return this.model.deleteOne({ _id: id });
    }
}

module.exports = new UserRepository();
