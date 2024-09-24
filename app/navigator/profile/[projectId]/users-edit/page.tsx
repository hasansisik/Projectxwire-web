import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";

import { columns } from "@/components/tables/columns";
import { DataTable } from "@/components/tables/data-table";

export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
});

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
          <h5>Politikalarımız</h5>
          <p className="text-muted-foreground font-normal text-sm">
            Uygulama Politikalarımızı İnceleyebilirsiniz.
          </p>
        </div>
      </div>
      <DataTable data={tasks} columns={columns} />
    </>
  );
}
