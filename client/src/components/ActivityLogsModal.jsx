import { X } from "lucide-react";
// import { dummyActivities } from "../assets/assets";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchActivityLogsOfProject } from "../features/activitySlice";

const ActivityLogModal = ({  onClose, projectId }) => {

    // const activities = dummyActivities;
    const dispatch = useDispatch();
    
    
    useEffect(()=> {
        dispatch(fetchActivityLogsOfProject(projectId))
    },[])

    const {activities} = useSelector((state) => state.activity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-5">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <button onClick={onClose}>
            <X className="w-5 h-5 text-gray-600 hover:text-black" />
          </button>
        </div>

        {/* Activity List */}
        <div className="space-y-3 max-h-[350px] overflow-y-auto">
          {activities.length === 0 ? (
            <p className="text-sm text-gray-500 text-center">
              No recent activity
            </p>
          ) : (
            activities.map((log) => (
              <div
                key={log._id}
                className="border rounded-lg p-3 text-sm bg-gray-50"
              >
                <p className="text-gray-800">
                  <span className="font-medium">
                    {log.actorName || "Someone"}
                  </span>{" "}
                  <span className="text-gray-600">
                    {log.action.toLowerCase()}
                  </span>{" "}
                  <span className="font-medium">
                    {log.entityName}
                  </span>
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogModal;