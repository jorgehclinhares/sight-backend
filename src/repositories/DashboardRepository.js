const Project = require('../models/Project')
const Error = require('../models/Error')

module.exports.show = async () => {
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
        errors: {
          $size: "$errors"
        }
      }
    }
  ])

  return projects
}
