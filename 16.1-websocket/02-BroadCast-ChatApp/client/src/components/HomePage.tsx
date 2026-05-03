import { PlusSquare, Search } from "lucide-react";
import { useState } from "react";
import JoinGroupDialog from "./JoinGroupDialog";
import CreateGroupDialog from "./CreateGroupDialog";

const HomePage = () => {
  const [isJoinGroupDialogOpen, setIsJoinGroupOpen] = useState<boolean>(false);
  const [isCreateGroupDialogOpen, setIsCreateGroupDialogOpen] =
    useState<boolean>(false);
  return (
    <div className="relative flex gap-3 p-10 min-h-screen justify-center items-center">
      <button
        className="flex flex-col justify-center items-center cursor-pointer border p-2 rounded-2xl"
        onClick={() => setIsCreateGroupDialogOpen(true)}
      >
        <PlusSquare /> Create Group
      </button>
      <button
        className="flex flex-col justify-center items-center cursor-pointer border p-2 rounded-2xl"
        onClick={() => setIsJoinGroupOpen(true)}
      >
        <Search /> Join Group
      </button>

      {isJoinGroupDialogOpen && (
        <JoinGroupDialog setClose={() => setIsJoinGroupOpen(false)} />
      )}
      {isCreateGroupDialogOpen && (
        <CreateGroupDialog setClose={() => setIsCreateGroupDialogOpen(false)} />
      )}
    </div>
  );
};
export default HomePage;
