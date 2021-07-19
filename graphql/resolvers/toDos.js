const { AuthenticationError, UserInputError } = require("apollo-server");

const ToDo = require("../../models/ToDo");
const checkAuth = require("../../util/check-auth");
const {
  validateToDoInput,
  validateDateInput,
  validateReminderInput,
} = require("../../util/validators");

module.exports = {
  Query: {
    async getSelectedToDosByUsername(
      _,
      { globality, username, day, month, year }
    ) {
      if (globality) {
        try {
          const toDos = await ToDo.find({
            globality: true,
            username: username,
          }).sort({ createdAt: -1 });
          return toDos;
        } catch (error) {
          throw new Error(error);
        }
      } else if (day) {
        try {
          const toDos = await ToDo.find({
            day: day,
            month: month,
            year: year,
            username: username,
          });
          return toDos;
        } catch (error) {
          throw new Error(error);
        }
      } else if (month && year) {
        try {
          const toDos = await ToDo.find({
            month: month,
            year: year,
            username: username,
          });
          return toDos;
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          const toDos = await ToDo.find({ date: date, username: username });
          return toDos;
        } catch (error) {
          throw new Error(error);
        }
      }
    },
    async getToDo(_, { toDoId }) {
      try {
        const toDo = await ToDo.findById(toDoId);
        if (toDo) {
          return toDo;
        } else {
          throw new Error("Todo not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async getFriendsToDos(_, {day, month, year}, context) {
      const user = checkAuth(context)
      
      if (day) {
        try {
          const toDo = await ToDo.find({
            day: day,
            month: month,
            year: year,
            username: {
              $in: [user.friendsList],
            },
          });
          if (toDo) {
            return toDo;
          } else {
            throw new Error("No todos found");
          }
        } catch (error) {
          throw new Error(error);
        }
      } else {
        try {
          const toDo = await ToDo.find({
            month: month,
            year: year,
            username: {
              $in: [user.friendsList],
            },
          });
          if (toDo) {
            return toDo;
          } else {
            throw new Error("No todos found");
          }
        } catch (error) {
          throw new Error(error);
        }
      }
    },
  },
  Mutation: {
    async createToDo(
      _,
      {
        toDoName,
        time,
        day,
        month,
        year,
        body,
        globality,
        canRemind,
        canComment,
        category,
        isPublic,
        viewList,
      },
      context
    ) {
      const { valid, errors } = validateToDoInput(toDoName, body);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const { username } = checkAuth(context);

      try {
        if (globality) {
          const newToDo = new ToDo({
            toDoName,
            body,
            globality,
            canRemind,
            canComment,
            category,
            isPublic,
            viewList,
            username: username,
            createdAt: new Date().toISOString(),
          });
          const toDo = await newToDo.save();
          return toDo;
        } else {
          const { validDate, dateErrors } = validateDateInput(time, day);
          if (!validDate) {
            throw new UserInputError("Errors", { dateErrors });
          }
          const newToDo = new ToDo({
            toDoName,
            time,
            day,
            month,
            year,
            body,
            globality,
            canRemind,
            canComment,
            category,
            isPublic,
            viewList,
            username: username,
            createdAt: new Date().toISOString(),
          });

          const toDo = await newToDo.save();
          return toDo;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async updateToDo(
      _,
      {
        toDoId,
        toDoName,
        time,
        day,
        month,
        year,
        body,
        isComplete,
        globality,
        canRemind,
        canComment,
        category,
        isPublic,
        viewList,
      },
      context
    ) {
      const { valid, errors } = validateToDoInput(toDoName, body);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const { username } = checkAuth(context);

      try {
        const toDo = ToDo.findById(toDoId);

        if (toDo) {
          if (toDo.username === username) {
            if (globality) {
              toDo.toDoName = toDoName;
              toDo.time = "";
              toDo.day = "";
              toDo.month = "";
              toDo.year = "";
              toDo.body = body;
              toDo.isComplete = isComplete;
              toDo.globality = globality;
              toDo.canRemind = canRemind;
              toDo.canComment = canComment;
              toDo.category = category;
              toDo.isPublic = isPublic;
              toDo.viewList = viewList;
              await toDo.save();
              return toDo;
            } else {
              toDo.toDoName = toDoName;
              toDo.time = time;
              toDo.day = day;
              toDo.month = month;
              toDo.year = year;
              toDo.body = body;
              toDo.isComplete = isComplete;
              toDo.globality = globality;
              toDo.canRemind = canRemind;
              toDo.canComment = canComment;
              toDo.category = category;
              toDo.isPublic = isPublic;
              toDo.viewList = viewList;
              await toDo.save();
              return toDo;
            }
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else {
          throw new UserInputError("Todo not found");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteToDo(_, { toDoId }, context) {
      const user = checkAuth(context);

      try {
        const toDo = await ToDo.findById(toDoId);
        if (user.username === toDo.username) {
          await ToDo.delete();
          return "ToDo deleted successfully";
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async createReminder(_, { toDoId, alertTime, alertDate, body }, context) {
      const { username } = checkAuth(context);
      const { validDate, dateErrors } = validateReminderInput(
        alertTime,
        alertDate,
        body
      );
      if (!validDate) {
        throw new UserInputError("Errors", { dateErrors });
      }

      const toDo = await ToDo.findById(toDoId);

      if (toDo) {
        if (toDo.canRemind === true) {
          toDo.reminders.unshift({
            body,
            username,
            alertTime,
            alertDate,
          });
          await toDo.save();
          return toDo;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Todo not Found");
      }
    },
    async deleteReminder(_, { toDoId, reminderId }, context) {
      const { username } = checkAuth(context);

      const toDo = await ToDo.findById(toDoId);

      if (toDo) {
        const reminderIndex = toDo.reminders.findIndex(
          (r) => r.id === reminderId
        );
        if (
          toDo.username === username ||
          toDo.reminders[reminderIndex].username === username
        ) {
          toDo.reminders.splice(reminderIndex, 1);
          await toDo.save();
          return toDo;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Todo not found");
      }
    },
    async createComment(_, { toDoId, body }, context) {
      const { username } = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty Comment", {
          errors: {
            body: "Comment body must not be empty",
          },
        });
      }
      const toDo = await ToDo.findById(toDoId);
      if (toDo) {
        if (toDo.canComment === true) {
          toDo.Comments.unshift({
            body,
            username,
            createdAt: new Date().toISOString(),
          });
          await toDo.save();
          return toDo;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Todo not found");
      }
    },
    async deleteComment(_, { toDoId, commentId }, context) {
      const { username } = checkAuth(context);

      const toDo = await ToDo.findById(toDoId);

      if (toDo) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentId);
        if (
          toDo.username === username ||
          toDo.comments[commentIndex].username === username
        ) {
          toDo.comments.splice(commentIndex, 1);
          await toDo.save();
          return toDo;
        } else {
          throw new AuthenticationError("Action not allowed");
        }
      } else {
        throw new UserInputError("Todo not found");
      }
    },
  },
};
