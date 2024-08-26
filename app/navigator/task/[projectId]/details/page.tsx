import { ChatLayout } from "@/components/chat/chat-layout";
import { cookies } from "next/headers";

export default function TaskPage() {
  const layout = cookies().get("react-resizable-panels:layout");
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;

  return <ChatLayout defaultLayout={defaultLayout} navCollapsedSize={8} />;
}
