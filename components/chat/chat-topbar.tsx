import React from "react";
import { Info, Phone, Video } from "lucide-react";

interface ChatTopbarProps {
  task: any;
}

export const TopbarIcons = [{ icon: Phone }, { icon: Video }, { icon: Info }];

export default function ChatTopbar({ task }: ChatTopbarProps) {
  return (
    <div className="w-full h-20 flex p-4 justify-between items-center border-b">
      <div className="flex flex-col">
        <span className="font-medium">{task.taskTitle}</span>
      </div>
    </div>
  );
}
