// import "../styles/Homepage.css";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { MdModeEditOutline } from "react-icons/md";
// import { MdDensitySmall } from "react-icons/md";
// import { SiDailymotion } from "react-icons/si";
// import { MdCalendarViewWeek } from "react-icons/md";
// import { MdOutlineCalendarMonth } from "react-icons/md";
// import { GiCalendarHalfYear } from "react-icons/gi";
// import { MdDelete } from "react-icons/md";
// import { useForm } from "react-hook-form";
// import { Notify } from "notiflix";
// import axios from "axios";

// function HomePage() {
//   const { register, handleSubmit } = useForm();

//   const onsend = async (data) => {
//     try {
//       const formData = {
//         taskname: data.taskname,
//         duration: data.duration,
//       };

//       const response = await axios.post(
//         // "https://botiga-kvf9.onrender.com/contact/createContact",
//         "http://localhost:5001/task/createTask",
//         formData,
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       Notify.success("Task created successfully");
//       console.log("Task saved successfully:", response.data);
//     } catch (error) {
//       console.error(
//         "Error sending message:",
//         error.response?.data || error.message
//       );
//       Notify.failure("Failed to create task");
//     }
//   };

//   return (
//     <section className="">
//       <div className="formClass">
//         <div className="">
//           <form className="" onSubmit={handleSubmit(onsend)}>
//             <div className="firstDiv">
//               <h1 className="task-header">
//                 Make a better Plan <br /> for your life
//               </h1>
//               {/* <span className="task-subtext">Whoever you are, whatever you are looking for, 

//  </span> */}

//               <div className="input-group-custom">
//                 <span className="task-subtext">
//                   Whoever you are, whatever you are looking for, <br />
//                   we have the perfect place for you
//                 </span>

//                 <select {...register("duration", { required: true })}>
//                   <option value="">Duration</option>
//                   <option value="Daily">Daily Tasks</option>
//                   <option value="Weekly">Weekly Tasks</option>
//                   <option value="Monthly">Monthly Tasks</option>
//                   <option value="Yearly">Yearly Tasks</option>
//                 </select>

//                 <input
//                   type="text"
//                   placeholder="Task"
//                   {...register("taskname", { required: true })}
//                 />

//                 <button type="submit">Add task</button>
//               </div>
//             </div>

//             <div className="filter-buttons">
//               <button type="button">
//                 <MdDensitySmall /> All
//               </button>
//               <button type="button">
//                 <SiDailymotion /> Daily
//               </button>
//               <button type="button">
//                 <MdCalendarViewWeek /> Weekly
//               </button>
//               <button type="button">
//                 <MdOutlineCalendarMonth /> Monthly
//               </button>
//               <button type="button">
//                 <GiCalendarHalfYear /> Yearly
//               </button>
//             </div>

//             <div className="allTasks">
//               <p>
//                 1. Learn React{" "}
//                 <span>
//                   <MdModeEditOutline /> <MdDelete />
//                 </span>
//               </p>
//               <p>
//                 2. Learn Node.js{" "}
//                 <span>
//                   <MdModeEditOutline /> <MdDelete />
//                 </span>
//               </p>
//               <p>
//                 3. Learn MongoDB{" "}
//                 <span>
//                   <MdModeEditOutline /> <MdDelete />
//                 </span>
//               </p>
//               <p>
//                 4. Learn MongoDB{" "}
//                 <span>
//                   <MdModeEditOutline /> <MdDelete />
//                 </span>
//               </p>
//               <p>
//                 5. Learn MongoDB{" "}
//                 <span>
//                   <MdModeEditOutline /> <MdDelete />
//                 </span>
//               </p>
//               <p>
//                 6. Learn MongoDB{" "}
//                 <span>
//                   <MdModeEditOutline /> <MdDelete />
//                 </span>
//               </p>
//             </div>
//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }

import "../styles/Homepage.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdModeEditOutline } from "react-icons/md";
import { MdDensitySmall } from "react-icons/md";
import { SiDailymotion } from "react-icons/si";
import { MdCalendarViewWeek } from "react-icons/md";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { GiCalendarHalfYear } from "react-icons/gi";
import { MdDelete } from "react-icons/md";
import { MdCheck, MdClose } from "react-icons/md";
import { useForm } from "react-hook-form";
import { Notify } from "notiflix";
import axios from "axios";
import { useState, useEffect } from "react";

function HomePage() {
  const { register, handleSubmit, reset } = useForm();
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    taskname: "",
    duration: ""
  });

  // Fetch all tasks when component mounts
  useEffect(() => {
    fetchTasks();
  }, []);

  // Filter tasks when activeFilter or tasks change
  useEffect(() => {
    filterTasks();
  }, [activeFilter, tasks]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("//https://todoplanbackend-2.onrender.com/task/getAllTask");
      
      // Ensure response.data is an array
      const tasksData = Array.isArray(response.data) ? response.data : 
                       Array.isArray(response.data.tasks) ? response.data.tasks : [];
      
      setTasks(tasksData);
      console.log("Tasks fetched successfully:", tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
      Notify.failure("Failed to fetch tasks");
      setTasks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const filterTasks = () => {
    // Ensure tasks is always an array
    const taskArray = Array.isArray(tasks) ? tasks : [];
    
    if (activeFilter === "All") {
      setFilteredTasks(taskArray);
    } else {
      const filtered = taskArray.filter(task => task.duration === activeFilter);
      setFilteredTasks(filtered);
    }
  };

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
  };

  const onsend = async (data) => {
    try {
      const formData = {
        taskname: data.taskname,
        duration: data.duration,
      };

      const response = await axios.post(
        "//https://todoplanbackend-2.onrender.com/task/createTask",
        //https://todoplanbackend-2.onrender.com
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Notify.success("Task created successfully");
      console.log("Task saved successfully:", response.data);
      
      // Reset form and refresh tasks
      reset();
      fetchTasks();
    } catch (error) {
      console.error(
        "Error sending message:",
        error.response?.data || error.message
      );
      Notify.failure("Failed to create task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    // Add confirmation before deleting
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await axios.delete(`http://localhost:5001/task/deleteTaskById/${taskId}`);
        Notify.success("Task deleted successfully");
        fetchTasks(); // Refresh the tasks list
      } catch (error) {
        console.error("Error deleting task:", error.response?.data || error.message);
        Notify.failure("Failed to delete task");
      }
    }
  };

  const handleEditTask = (task) => {
    setEditingTaskId(task._id || task.id);
    setEditFormData({
      taskname: task.taskname,
      duration: task.duration
    });
  };

  const handleSaveEdit = async (taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:5001/task/updateTaskById/${taskId}`,
        editFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      Notify.success("Task updated successfully");
      setEditingTaskId(null);
      setEditFormData({ taskname: "", duration: "" });
      fetchTasks(); // Refresh the tasks list
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
      Notify.failure("Failed to update task");
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditFormData({ taskname: "", duration: "" });
  };

  const handleEditFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="">
      <div className="formClass">
        <div className="">
          <form className="" onSubmit={handleSubmit(onsend)}>
            <div className="firstDiv">
              <h1 className="task-header">
                Make a better Plan <br /> for your life
              </h1>

              <div className="input-group-custom">
                <span className="task-subtext">
                  Whoever you are, whatever you are looking for, <br />
                  we have the perfect place for you
                </span>

                <select {...register("duration", { required: true })}>
                  <option value="">Duration</option>
                  <option value="Daily">Daily Tasks</option>
                  <option value="Weekly">Weekly Tasks</option>
                  <option value="Monthly">Monthly Tasks</option>
                  <option value="Yearly">Yearly Tasks</option>
                </select>

                <input
                  type="text"
                  placeholder="Task"
                  {...register("taskname", { required: true })}
                />

                <button type="submit">Add task</button>
              </div>
            </div>

            <div className="filter-buttons">
              <button 
                type="button" 
                className={activeFilter === "All" ? "active" : ""}
                onClick={() => handleFilterClick("All")}
              >
                <MdDensitySmall /> All
              </button>
              <button 
                type="button"
                className={activeFilter === "Daily" ? "active" : ""}
                onClick={() => handleFilterClick("Daily")}
              >
                <SiDailymotion /> Daily
              </button>
              <button 
                type="button"
                className={activeFilter === "Weekly" ? "active" : ""}
                onClick={() => handleFilterClick("Weekly")}
              >
                <MdCalendarViewWeek /> Weekly
              </button>
              <button 
                type="button"
                className={activeFilter === "Monthly" ? "active" : ""}
                onClick={() => handleFilterClick("Monthly")}
              >
                <MdOutlineCalendarMonth /> Monthly
              </button>
              <button 
                type="button"
                className={activeFilter === "Yearly" ? "active" : ""}
                onClick={() => handleFilterClick("Yearly")}
              >
                <GiCalendarHalfYear /> Yearly
              </button>
            </div>

            <div className="allTasks">
              {loading ? (
                <p>Loading tasks...</p>
              ) : !Array.isArray(filteredTasks) || filteredTasks.length === 0 ? (
                <p>No tasks found for the selected filter.</p>
              ) : (
                filteredTasks.map((task, index) => {
                  const taskId = task._id || task.id;
                  const isEditing = editingTaskId === taskId;
                  
                  return (
                    <div key={taskId || index} className="task-item">
                      {isEditing ? (
                        // Edit mode
                        <div className="edit-task-form">
                          <span>{index + 1}. </span>
                          <input
                            type="text"
                            value={editFormData.taskname}
                            onChange={(e) => handleEditFormChange('taskname', e.target.value)}
                            className="edit-input"
                            placeholder="Task name"
                          />
                          <select
                            value={editFormData.duration}
                            onChange={(e) => handleEditFormChange('duration', e.target.value)}
                            className="edit-select"
                          >
                            <option value="Daily">Daily</option>
                            <option value="Weekly">Weekly</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Yearly">Yearly</option>
                          </select>
                          <span className="edit-actions">
                            <MdCheck 
                              onClick={() => handleSaveEdit(taskId)}
                              style={{ cursor: 'pointer', marginRight: '5px', color: 'green' }}
                              title="Save"
                            />
                            <MdClose 
                              onClick={handleCancelEdit}
                              style={{ cursor: 'pointer', color: 'red' }}
                              title="Cancel"
                            />
                          </span>
                        </div>
                      ) : (
                        // Display mode
                        <p>
                          {index + 1}. {task.taskname} 
                          <span className="task-duration">{task.duration}</span>
                          <span>
                            <MdModeEditOutline 
                              onClick={() => handleEditTask(task)}
                              style={{ cursor: 'pointer', marginRight: '5px' }}
                              title="Edit"
                            /> 
                            <MdDelete 
                              onClick={() => handleDeleteTask(taskId)}
                              style={{ cursor: 'pointer', color: 'red' }}
                              title="Delete"
                            />
                          </span>
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HomePage;