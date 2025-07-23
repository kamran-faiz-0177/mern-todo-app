const {CreateTask, FetchAllTask, DeleteTask, UpdateTask} = require("../Controllers/TaskControlller");
const router = require("express").Router();

router.post("/create",CreateTask);
router.get("/fetch",FetchAllTask);
router.put("/update",UpdateTask);
router.delete("/delete",DeleteTask);

module.exports = router;