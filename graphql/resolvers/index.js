const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Event = require("../../models/event");
const User = require("../../models/user");
const Project = require("../../models/project");
const { useState } = require("react");

module.exports = {
  users: () => {
    return User.find()
      .then((result) => {
        return result.map((events) => {
          return { ...events._doc, password: null };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  userById: (args) => {
    return User.find({ _id: args.id })
      .then((result) => {
        return result.map((events) => {
          return { ...events._doc, password: null };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  projects: () => {
    return Project.find()
      .then((result) => {
        return result.map((projects) => {
          return { ...projects._doc };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  projectsById: (args) => {
    return Project.find({ userId: args.userId })
      .then((result) => {
        return result.map((projects) => {
          return { ...projects._doc };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  projectsByPost: (args) => {
    return Project.find({ post: true })
      .then((result) => {
        return result.map((projects) => {
          return { ...projects._doc };
        });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  createProject: (args) => {
    console.log(args);
    const project = new Project({
      userId: args.projectInput._id,
      name: args.projectInput.name,
      ArrayLine: args.projectInput.arryLine,
      ArrayIn: args.projectInput.arryIn,
      ArrayAnd: args.projectInput.arryAnd,
      ArrayOr: args.projectInput.arryOr,
      ArrayNot: args.projectInput.arryNot,
      post: false,
    });
    return project
      .save()
      .then((project) => {
        return { ...project._doc };
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  updateProject: (args) => {
    return Project.findById({ _id: args.id }).then((project) => {
      project.ArrayLine = args.projectInput.arryLine;
      project.ArrayIn = args.projectInput.arryIn;
      project.ArrayAnd = args.projectInput.arryAnd;
      project.ArrayOr = args.projectInput.arryOr;
      project.ArrayNot = args.projectInput.arryNot;
      return project.save().then((project) => {
        return { ...project._doc };
      });
    });
  },
  updateUser: (args) => {
    return User.findById({ _id: args.id }).then((user) => {
      user.name = args.name;
      user.surname = args.surname;
      return user.save().then((user) => {
        return { ...user._doc };
      });
    });
  },
  postProject: (args) => {
    return Project.findById({ _id: args.id }).then((project) => {
      project.post = true;
      return project.save().then((project) => {
        return { ...project._doc };
      });
    });
  },
  deleteProject: (args) => {
    console.log(args);
    return Project.findOneAndDelete({ _id: args.id }).then((res) => {
      return Project.findOne();
    });
  },
  createUser: (args, req) => {
    return User.findOne({ email: args.userInput.email })
      .then((user) => {
        if (user) {
          throw new Error("User alredy exists");
        }
        return bcryptjs.hash(args.userInput.password, 12);
      })
      .then((hashPassword) => {
        const user = new User({
          name: args.userInput.name,
          surname: args.userInput.surname,
          password: hashPassword,
          email: args.userInput.email,
        });
        return user
          .save()
          .then((user) => {
            return { ...user._doc, password: null };
          })
          .catch((err) => {
            console.log(err);
            throw err;
          });
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  },
  login: async ({ email, password }) => {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (!user) {
      throw new Error("Email incorect");
    }
    const isEqual = await bcryptjs.compare(password, user.password);
    if (!isEqual) {
      throw new Error("Password incorrect");
    }
    const token = jwt.sign({ userId: user._id, email: email }, "key", {
      expiresIn: "1h",
    });
    return { userId: user._id, token: token, tokenExperation: 1 };
  },
};
