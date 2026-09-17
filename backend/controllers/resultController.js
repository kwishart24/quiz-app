import Result from "../models/resultModel.js";

//Create result in Results database
export async function createResult(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const { title, technology, level, totalQuestions, correct, wrong } =
      req.body;

    if (
      !technology ||
      !level ||
      totalQuestions === undefined ||
      correct === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing fields",
      });
    }

    //Compute wrong if not provided
    const computedWrong =
      wrong !== undefined
        ? Number(wrong)
        : Math.max(0, Number(totalQuestions) - Number(correct));

    if (!title) {
      return res.status(401).json({
        success: false,
        message: "Missing title",
      });
    }

    const payload = {
      title: String(title).trim(),
      technology,
      level,
      totalQuestions: Number(totalQuestions),
      correct: Number(correct),
      wrong: computedWrong,
      user: req.user.id, //for a particular user
    };

    const created = await Result.create(payload);
    return res.status(201).json({
      success: true,
      message: "Result Created",
      result: created,
    });
  } catch (err) {
    console.error("CreateResult Error: ", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}

//LIST the RESULT
export async function listResults(req, res) {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const { technology } = req.query;

    const query = { user: req.user.id };

    if (technology && technology.toLowerCase() !== "all") {
      query.technology = technology;
    }

    const items = (await Result.find(query)).toSorted({ createdAt: -1 }).lean();
    return res.json({
      success: true,
      results: items,
    });
  } catch (err) {
    console.error("ListResult Error: ", err);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
}
