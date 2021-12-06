const instialState = {
  items: [],
  taskAdd: "",
  taskUpdate: "",
};

const tasks = (state = instialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SETTASKS":
      const { items } = payload;
      return { items };
    case "ADDTASK":
      const { items1, taskAdd } = payload;
      return { items: items1, taskAdd };

    case "UPDATETASK":
      const { items2, taskUpdate } = payload;
      return { items: items2, taskUpdate };

    default:
      return state;
  }
};

export default tasks;

export const setTasks = (data) => {
  return {
    type: "SETTASKS",
    payload: data,
  };
};

export const addTaskReducers = (data) => {
  return {
    type: "ADDTASK",
    payload: data,
  };
};

export const updateTaskReducers = (data) => {
  return {
    type: "UPDATETASK",
    payload: data,
  };
};
