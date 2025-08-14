import express from "express";
const router = express.Router();
router.get("/me", (req, res) => {
    res.send("Login Route");
});
export default router;
//# sourceMappingURL=users.routes.js.map