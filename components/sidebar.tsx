"use client";
import Link from "next/link";
import Image from "next/image";

interface SidebarProps {
  isCollapsed: boolean;
  task: any;
}

interface Person {
  _id: string;
  name: string;
}

export function Sidebar({ isCollapsed, task }: SidebarProps) {
  console.log(task.project);
  return (
    <div
      data-collapsed={isCollapsed}
      className="relative group flex flex-col h-full gap-4 p-2 data-[collapsed=true]:p-2 "
    >
      {!isCollapsed && (
        <div className="flex justify-between py-2 items-center">
          <div className="flex gap-5 items-center text-2xl">
            <p className="font-medium">Görevler</p>
            <span className="text-zinc-300">#{task.number}</span>
          </div>
        </div>
      )}

      {isCollapsed ? (
        <div></div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex-between">
            <h6 className="text-sm">Görev İsmi :</h6>
            <p className="text-sm">{task.taskTitle}</p>
          </div>
          <div className="flex-between">
            <h6 className="text-sm">Görev Kategorisi :</h6>
            <p className="text-sm">{task.taskCategory}</p>
          </div>
          <div className="flex-between">
            <h6 className="text-sm">Oluşturan Kişi :</h6>
            <p className="text-sm">{task.taskCreator.name}</p>
          </div>
          <div className="flex-between">
            <h6 className="text-sm">Projedeki Kişiler :</h6>
            {task.persons.map((person: Person) => (
              <p className="text-sm" key={person._id}>
                {person.name}
              </p>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <h6 className="text-sm">Görev Plan Görseli :</h6>
            <Link
              href={`/navigator/plan/${task.project}/details/?planId=${task.plan._id}`}
            >
              <Image
                src={task.plan.planImages}
                width="450"
                height="300"
                alt="Planwire"
                style={{ width: "450px", height: "300px" }}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
