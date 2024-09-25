import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { columns } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/data-table";
import { taskSchema } from "../../../../../components/tables/schema";

export type Task = z.infer<typeof taskSchema>;

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), "/components/tables/tasks.json")
  );

  const tasks = JSON.parse(data.toString());

  return z.array(taskSchema).parse(tasks);
}

export default async function TaskPage() {
  const tasks = await getTasks();

  return (
    <>
      <div className="pb-5 flex flex-row justify-between gap-4">
        <div className="pb-2">
          <h5>Personel Düzenleme</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Personel bilgilerini düzenleyebilirsiniz.
          </p>
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </>
  );
}
