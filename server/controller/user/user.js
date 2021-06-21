const { userRepository } = require("../../database");

class UserControllet {
    async list(req, res) {
        try {
            console.log("User Controller list");
            const result = await userRepository.getAll({});
            return res.json({ data: result })
        } catch (error) {
            console.log("User Fetch failed with error...", error);
            return res.status(500).json({ message: "Operation Failed!" });
        }

    }

    async get(req, res) {
        try {
            const { id } = req.params;
            console.log("User Controller get");
            const result = await userRepository.getByQuery({ _id: id });
            if (!result) {
                throw new Error('User not found')
            }
            return res.json({ data: result })
        } catch (error) {
            console.log("User Fetch failed with error...", error);
            return res.status(500).json({ message: "Operation Failed!" });
        }
    }

    async post(req, res) {
        try {
            const { firstName, lastName, email, phone, address } = req.body;
            console.log("User Controller post");
            const result = await userRepository.create({
                firstName,
                lastName,
                email,
                phone,
                address
            });
            return res.json({ data: result })
        } catch (error) {
            console.log("User post failed with error...", error);
            return res.status(500).json({ message: "Operation Failed!" });
        }

    }

    async put(req, res) {
        try {
            const { id } = req.params;
            const { firstName, lastName, email, phone, address } = req.body
            console.log("User Controller put");

            const result = await userRepository.update({
                id,
                firstName, lastName, email, phone, address,
            });
            return res.json({ data: result })
        } catch (error) {
            console.log("User update failed with error...", error);
            return res.status(500).json({ message: "Operation Failed!" });
        }

    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await userRepository.delete({ id });
            return res.json({ data: result })
        } catch (error) {
            console.log("User delete failed with error...", error);
            return res.status(500).json({ message: "Operation Failed!" });
        }

    }
}

module.exports = new UserControllet();
