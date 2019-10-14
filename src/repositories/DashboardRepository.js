const Project = require('../models/Project')

module.exports.index = async (filterProject) => {
  const projects = Project.aggregate([
    {
      $lookup: {
        from: "errors",
        let: { projectId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$project", "$$projectId"]
              }
            }
          },
          {
            $match: {
              resolved: false
            }
          }
        ],
        as: "errors"
      }
    },
    {
      $project: {
        _id: 1,
        name: 1,
        user: 1,
        errors: {
          $size: "$errors"
        }
      }
    },
    {
      $match: filterProject
    }
  ])

  return projects
}
