const { AuthenticationError, UserInputError } = require("apollo-server");

const ToDo = require("../../models/ToDo");
const checkAuth = require("../../util/check-auth");
const {validateToDoInput} = require("../../util/validators")

module.exports = {
  Query: {
      async getSelectedToDosByUsername(_, {globality, username, day, month, year}) {
          if (globality) {
              try {
                  const toDos = await ToDo.find({globality: true, username: username}).sort({createdAt: -1});
                  return toDos
              } catch (error) {
                  throw new Error(error)
              }
          } else if (day) {
            try {
                const toDos = await ToDo.find({day: day, month: month, year: year, username: username})
                return toDos
            } catch (error) {
                throw new Error(error)
            }
          } else if (month && year) {
            try {
                const toDos = await ToDo.find({month: month, year: year, username: username})
                return toDos
            } catch (error) {
                throw new Error(error)
            }
          } else {
              try {
                  const toDos = await ToDo.find({date: date, username: username});
                  return toDos
              } catch (error) {
                  throw new Error(error)
              }
          }
      },
      async getToDo(_, {toDoId}) {
          try {
              const toDo = await ToDo.findById(toDoId);
              if (toDo) {
                  return toDo
              } else {
                  throw new Error("Todo not found")
              }
          } catch (error) {
              throw new Error(error)
          }
      },
      async getFriendsToDos(day, month, year, friendsList) {
          if (day) {
              try {
                  const toDo = await ToDo.find({day: day, month: month, year: year, username: {
                      $in: [friendsList]
                  }})
                  if (toDo) {
                      return toDo
                  } else {
                      throw new Error("No todos found")
                  }
              } catch (error) {
                  throw new Error(error)
              }
          } else {
            try {
                const toDo = await ToDo.find({month: month, year: year, username: {
                    $in: [friendsList]
                }})
                if (toDo) {
                    return toDo
                } else {
                    throw new Error("No todos found")
                }
            } catch (error) {
                throw new Error(error)
            }
          }
      }
  },
  Mutation: {
      async createToDo(_,{toDoName, time, day, month, year, body, globality, canRemind, canComment, category, isPublic, viewList})
  },
};
